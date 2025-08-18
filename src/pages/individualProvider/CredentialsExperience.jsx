import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { ErrorMessage, Formik } from "formik";
import ErrorMsg1 from "@/components/ErrorMsg1";
import FormInput from "@/components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "@/lib/requestApi";
import supabase from "@/database/dbInit";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";


const MAX_FILE_SIZE = 10 * 1024 * 1024 
const ALLOWED_TYPES = [
  /^image\//,
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]


const CredentialsExperience = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { state } = useLocation()

  const userProfile = useSelector(state => getUserDetailsState(state).profile)

  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })

  useEffect(() => {
    if(!state?.profileDetails){
      navigate('/')
    }
  }, [state])

  useEffect(() => {
    const { isLoading, errorMsg } = apiReqs

    if(isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop())

  }, [apiReqs])

  if(!state?.profileDetails) return <></>

  const createProviderProfile = async (requestBody) => {
    try {

      const updateData = requestBody
      delete updateData?.email

      const { data, error } = await supabase
        .from("provider_profiles")
        .update(updateData)
        .eq("provider_id", userProfile.id)
        .select('*')

      if(!data || error) {
        console.log(error)
        throw new Error();
      }

      setApiReqs({ isLoading: false, })

      navigate('/individual/account-created')

      toast.success("Credentials submitted. We'll contact you via email once you're they are verified")

      return;
      
    } catch (error) {
      console.log(error)
      return accountCreationError({ errorMsg: 'Error uploading credential and profile documents' })
    }
  }

  const uploadFiles = async ({ files, requestBody }) => {
    try {

      const { result } = await cloudinaryUpload({ files })

      if(!result) throw new Error();

      const profile_img = result[0]?.secure_url
      const license_document = result[1]?.secure_url

      if(!license_document) throw new Error();

      toast.success("Credential and profile documents uploaded")

      createProviderProfile({
        ...requestBody,
        profile_img,
        license_document
      })

      return;
      
    } catch (error) {
      console.log(error)
      return accountCreationError({ errorMsg: 'Error uploading credential and profile documents' })
    }
  }

  const accountCreationError = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg })
    toast.error(errorMsg)

    return
  }

  const validationSchema = yup.object().shape({
    certification_number: yup
      .string()
      .required("Certification number is required"),

    license_document: yup
        .mixed()
        .required('License document is required')
        .test(
            'is-file',
            'You must select a file',
            value => value instanceof File
        )
        .test("file-type", "Only images, PDFs or Word docs allowed", file => {
          if (!file) return false
          return ALLOWED_TYPES.some(type =>
            type instanceof RegExp
              ? type.test(file.type)
              : file.type === type
          )
        })
        .test(
            'file-size',
            'File must be smaller than 10 MB',
            value => value && value.size <= MAX_FILE_SIZE
        ),

    years_of_experience: yup
      .number("Must contain only numbers")
      .typeError("Must contain only numbers")
      .min(1, "Must have at least 1 year of experience")
      .max(100, "It doesn't make sense that you have 100+ years of experience")
      .required('Years of experience is required')
  })

  return (
    <div className="min-h-screen flex items-start justify-center bg-transparent">
      <div className="max-w-[340px] md:max-w-xl bg-white rounded-2xl px-4 md:px-8 py-10 flex flex-col items-center shadow-none">
        <h1 className="text-2xl font-bold mb-1 text-left w-full">Credentials & Experience</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-sm">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            certification_number: '', license_document: '',
            years_of_experience: ''
          }}
          onSubmit={values => {
            if(userProfile?.license_document){
              toast.info("Credentials already submitted! We'll get back to you via email soon. Kindly exercise some patience! Cheers")
              return
            }
            
            const files = [state?.profileDetails?.profile_img, values.license_document]

            const requestBody = {
              ...values,
              ...state?.profileDetails
            }

            delete requestBody.profile_img
            delete requestBody.license_document

            setApiReqs({ isLoading: true, errorMsg: null })
            uploadFiles({ files, requestBody })
          }}
        >
          {({ values, setFieldValue, handleBlur, handleChange, handleSubmit, isValid, dirty }) => (
            <div className="w-full flex flex-col gap-4">
              {/* License / Certification Number */}
              <div>
                <div className="font-semibold mb-1">License / Certification Number</div>
                <FormInput 
                  name="certification_number"
                  value={values.certification_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="Input your Certification Number" 
                  className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage name="certification_number">
                  { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                </ErrorMessage>
              </div>
              
              {/* Upload Credential Document */}
              <div>
                <div className="font-semibold mb-1">Upload Credential Document</div>
                {
                  values?.license_document
                  &&
                    <p className="text-base text-gray-600 fw-700 text-center font-family-Outfit">
                      Document found
                    </p>
                }
                <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                  <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
                  <div className="text-sm font-medium mb-1">Click the button below to select a file</div>
                  <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>

                  <div className="flex items-center justify-center">
                    <input
                        name="license_document"
                        type="file"
                        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        placeholder="Browse file"
                        className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"                                        
                        onChange={e => {
                            const file = e.currentTarget.files?.[0] ?? null
                            setFieldValue("license_document", file)                                    
                        }}
                    />     
                  </div>

                  {/* <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button> */}
                </div>
              </div>

              {/* Years of Experience */}
              <div className="mb-4">
                <div className="font-semibold mb-1">Years of Experience</div>
                <FormInput 
                  name="years_of_experience"
                  value={values.years_of_experience}
                  onChange={handleChange}
                  onBlur={handleBlur}                
                  type="text" 
                  placeholder="e.g., 1-30 years" 
                  className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <ErrorMessage name="years_of_experience">
                  { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                </ErrorMessage>                
              </div>

              {/* Affiliations */}
              {/* <div>
                <div className="font-semibold mb-1">Affiliations <span className="text-xs text-gray-500 font-normal">(Optional)</span></div>
                <input type="text" placeholder="Are you affiliated to any hospitals /clinics" className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
              </div> */}

              {
                apiReqs.errorMsg
                &&
                  <ErrorMsg1 errorMsg={apiReqs.errorMsg} position={'center'} />
              }

              {/* Next Button */}
              <button 
                disabled={!(isValid && dirty)}
                style={{
                  opacity: !(isValid && dirty) ? 0.5 : 1
                }}
                onClick={handleSubmit} 
                type="button" 
                className="cursor-pointer bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-0 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2"
              >
                Next <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
              </button>
              {/* Skip link */}
              <div className="flex justify-end items-center w-full mt-2">
                {/* <button type="button" className="text-primary-600 font-semibold text-base bg-transparent px-0 py-0 hover:underline">Skip</button> */}
                {/* Pagination dots */}
                <div className="flex justify-center items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                </div>
              </div>
            </div>
          )}

        </Formik>
      </div>
    </div>
  );
};

export default CredentialsExperience;
