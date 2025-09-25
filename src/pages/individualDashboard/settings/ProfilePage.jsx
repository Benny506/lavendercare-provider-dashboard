import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@iconify/react';
import TopDivider from '@/components/TopDivider';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsState, setUserDetails, specializations } from '@/redux/slices/userDetailsSlice';
import ProfileImg from '@/components/ui/ProfileImg';
import { ErrorMessage, Formik } from 'formik';
import ErrorMsg1 from '@/components/ErrorMsg1';
import * as yup from 'yup'
import { Eye, EyeOff, Square, SquareCheckBig, X } from 'lucide-react';
import { toast } from 'react-toastify';
import supabase from '@/database/dbInit';
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice';
import OtpForm from '@/components/OtpForm';
import ValidateEmailModal from './auxiliary/ValidateEmailModal';
import { cloudinaryUpload, requestApi } from '@/lib/requestApi';
import FormInput from '@/components/FormInput';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function validateImageFile(file) {
  if (!(file instanceof File)) {
    return { valid: false, error: "You must select a file" };
  }

  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "Only image files are allowed" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File must be smaller than 5 MB" };
  }

  return { valid: true, error: null };
}


const IndividualProfilePage = () => {
    const dispatch = useDispatch()

    const profile = useSelector(state => getUserDetailsState(state).profile)
    const phone_number = useSelector(state => getUserDetailsState(state).phone_number)

    const fileInputRef = useRef(null)

    const [profileImgPreview, setProfileImgPreview] = useState({
        file: null, preview: null 
    })
    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
    const [validateEmailModal, setValidateEmailModal] = useState({ visible: false, hide: null, data: null })
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)

    useEffect(() => {
        const { isLoading } = apiReqs

        if(isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop())

        return;
    }, [apiReqs])

    const updatePhoneNumber = async ({ requestBody }) => {
        try {

            const { error } = await supabase
                .from("unique_phones")
                .upsert(requestBody, {
                    onConflict: ['user_id']
                })

            if(error) {
                console.log(error)
                throw new Error();
            }

            setApiReqs({ isLoading: false, data: null })     

            dispatch(setUserDetails({
                phone_number: requestBody
            }))

            toast.success("Phone number updated")

            return;
        
        } catch (error) {
            console.log(error)
            return updateProfileFailure({ errorMsg: 'Error updating phone number' })
        }
    }    

    const updateProfile = async ({ requestBody }) => {
        try {

            const { data, error } = await supabase
                .from("provider_profiles")
                .update(requestBody)
                .eq("provider_id", profile?.id)
                .select('*')
                .single()

            if(!data || error) {
                console.log(error)
                throw new Error();
            }

            setApiReqs({ isLoading: false, data: null })  
            setProfileImgPreview({ file: null, preview: null })      

            dispatch(setUserDetails({
                profile: {
                    ...profile,
                    ...data
                }
            }))

            toast.success("Profile updated")

            return;
        
        } catch (error) {
            console.log(error)
            return updateProfileFailure({ errorMsg: 'Error updating profile' })
        }
    }    
    const updateProfileFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg })
        toast.error(errorMsg)

        return
    }

    const uploadFiles = async ({ files, requestBody }) => {
        try {

        const { result } = await cloudinaryUpload({ files })

        if(!result) throw new Error();

        const profile_img = result[0]?.secure_url

        if(!profile_img) throw new Error();

        toast.success("Image uploaded")

        await updateProfile({
            requestBody: {
                ...requestBody,
                profile_img
            }
        })

        return;
        
        } catch (error) {
            console.log(error)
            return updateProfileFailure({ errorMsg: 'Error uploading image' })
        }
    } 
    
    const updatePassword = async ({ new_password, old_password }) => {
        try {

            setApiReqs({ isLoading: true, errorMsg: null })

            console.log(profile?.email)

            const { result, errorMsg, responseStatus } = await requestApi({ 
                url: 'https://tzsbbbxpdlupybfrgdbs.supabase.co/functions/v1/update-user-password',
                method: 'POST',
                data: {
                    old_password,
                    new_password,
                    email: profile?.email
                },
            })

            if(errorMsg || !result || !responseStatus){
                console.log(errorMsg)
                throw new Error()
            }

            setApiReqs({ isLoading: false, errorMsg: null })

            toast.success("Password updated")

            return;
            
        } catch (error) {
            console.log(error)
            return updateProfileFailure({ errorMsg: 'Error updating password! You sure that is the right password?' })
        }
    }

    const openValidateEmailModal = ({ data }) => setValidateEmailModal({ visible: true, hide: hideValidateEmailModal, data })
    const hideValidateEmailModal = () => setValidateEmailModal({ visible: false, hide: null, data: null  })

    const toggleOldPasswordVisibility = () => setOldPasswordVisible(prev => !prev)
    const toggleNewPasswordVisibility = () => setNewPasswordVisible(prev => !prev)

    const validationSchema = yup.object().shape({
        provider_name: yup.string()
            .required("Full name is required"),

        // professional_title: yup
        //     .string()
        //     .required("Professional title is required"),

        provider_bio: yup
            .string()
            .required("Provider bio is required")
            .max(300, "Maximum of 300 characters"),

        provider_specialties: yup
            .array()
            .min(1, "Select at least one specialization")
            .required("Provider specialties is required"),

        years_of_experience: yup
            .number("Must contain only numbers")
            .typeError("Must contain only numbers")
            .min(1, "Must have at least 1 year of experience")
            .max(100, "It doesn't make sense that you have 100+ years of experience")
            .required('Years of experience is required'),
        gender: yup
            .string()               
            .required("Gender is required")

        // countryCode: yup.string()
        //     .required("Country code is required"),

        // email: yup.string()
        //     .required('Email is required')
        //     .email('Must be a valid email address'),

        // password: yup.string()
        //     .required('Password is required')
        //     .min(8, 'Password must be at least 8 characters')
        //     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        //     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        //     .matches(/\d/, 'Password must contain at least one number')
        //     .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),

        // confirmPassword: yup.string()
        //     .required('Please confirm your password')
        //     .oneOf([yup.ref('password'), null], 'Passwords must match'),

        // phone_number: yup.string()
        //     .required('Phone number is required')
        //     .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
    });    

    return (
        <div>
            <TopDivider />
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 rounded-2xl flex justify-start items-start w-full flex-col">
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        profile_img: profile?.profile_img,
                        provider_bio: profile?.provider_bio,
                        provider_name: profile?.provider_name,
                        gender: profile?.gender,
                        years_of_experience: profile?.years_of_experience,
                        provider_specialties: profile?.provider_specialties
                    }}
                    onSubmit={(values) => {

                        setApiReqs({ isLoading: true, errorMsg: null })

                        if(profileImgPreview?.file){
                            return uploadFiles({ files: [profileImgPreview?.file], requestBody: values })
                        }

                        updateProfile({ requestBody: values })
                    }}
                >
                    {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty, setFieldValue }) => (
                        <>
                            <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-start justify-between mb-8 w-full">
                                <div className="flex items-start space-x-4">
                                    <div className="relative">
                                        <ProfileImg 
                                            profile_img={profileImgPreview?.preview || profile?.profile_img}
                                            containerClass={"w-20 h-20"}
                                            width={'75px'} height={'75px'}
                                            textClass={"bg-gray-300 text-gray-600 text-2xl font-medium"}
                                        />
                                        {
                                            profileImgPreview?.preview
                                            &&
                                                <div onClick={() => setProfileImgPreview({ file: null, preview: null })} className="cursor-pointer absolute -bottom-1 -left-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">                                            
                                                    <X className="w-4 h-4 text-white" />
                                                </div>                                            
                                        }

                                        <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                            <Icon icon="material-symbols:photo-camera" className="w-3 h-3 text-white" />
                                        </div>                                        
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={e => {
                                                const file = e.currentTarget.files?.[0] ?? null

                                                if(!file) return;

                                                const { valid, error } = validateImageFile(file)

                                                if(!valid){
                                                    const errorMsg = error || 'Invalid file'
                                                    toast.error(errorMsg)

                                                    return;
                                                }                                            

                                                if (file) {
                                                    const reader = new FileReader()
                                                    reader.onloadend = () => {
                                                        // reader.result is a base64 data-URL
                                                        setProfileImgPreview({ file, preview: reader.result })
                                                    }
                                                    reader.readAsDataURL(file)

                                                }                                 
                                            }}                                            
                                        />                                        
                                    </div>
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hello, {profile?.provider_name}!</h1>
                                        {
                                            profile?.provider_specialties?.map((s, i) => (
                                                <p key={i} className="text-gray-600 capitalize">
                                                    { s?.replaceAll("_", " ") }
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>

                                <ErrorMessage name='profile_img'>
                                    { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                                </ErrorMessage>
                            </div>

                            <div className='flex flex-col gap-6 mb-20 w-full max-w-2xl'>
                                {/* Professional Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Professional Title
                                    </label>
                                    <div className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg">
                                        { profile?.professional_title }
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Specializations (Multi-select)
                                    </label>                                
                                    <div className="flex flex-col gap-2 mt-1">
                                        {specializations.map((item) => {

                                            const sp = item.toLowerCase().replaceAll(" ", "_")
                                            const currentSpecializations = values?.provider_specialties || []

                                            const isSelected = currentSpecializations.includes(sp)

                                            const handleItemClick = () => {
                                                let updatedSpecializations = currentSpecializations

                                                if (isSelected) {
                                                    updatedSpecializations = currentSpecializations.filter(s => s != sp)

                                                } else {
                                                    updatedSpecializations.push(sp)
                                                }

                                                setFieldValue("provider_specialties",
                                                    updatedSpecializations?.length > 0 ? updatedSpecializations : null
                                                )
                                            }

                                            return (
                                                <label
                                                    key={item}
                                                    onClick={handleItemClick}
                                                    className={`flex items-center justify-start ${'cursor-pointer'} gap-2 select-none`}
                                                >
                                                    {
                                                        isSelected
                                                        ?
                                                            <SquareCheckBig size={18} color="#6F3DCB" />
                                                        :
                                                            <Square size={18} color="#000" />
                                                    }
                                                    <span className="text-base">{item}</span>
                                                </label>
                                            )
                                        })}
                                        <ErrorMessage name="provider_specialties">
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                        </ErrorMessage>
                                        {/* <div className="text-xs text-gray-500 mt-1 mb-2">Others</div> */}
                                    </div>
                                </div>                            

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Bio
                                    </label>
                                    <textarea
                                        name='provider_bio'
                                        className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Provider bio"
                                        value={values.provider_bio}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage name='provider_bio'>
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                                    </ErrorMessage>
                                </div>

                                {/* Full name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Full name
                                    </label>
                                    <input
                                        name='provider_name'
                                        type="text"
                                        value={values.provider_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Full name'
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name='provider_name'>
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                                    </ErrorMessage>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Gender
                                    </label>
                                    <select
                                        name='gender'
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Gender'
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        defaultValue={''}
                                    >
                                        <option value={''} disabled>Choose one</option>
                                        <option value={'m'}>M</option>
                                        <option value={'f'}>F</option>
                                    </select>

                                    <ErrorMessage name='gender'>
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                                    </ErrorMessage>
                                </div>   

                                {/* Years of experience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Years of experience
                                    </label>
                                    <input
                                        name='years_of_experience'
                                        type="number"
                                        value={values.years_of_experience}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Years of experience'
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <ErrorMessage name='years_of_experience'>
                                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                                    </ErrorMessage>
                                </div>                                                     

                                <button 
                                    // disabled={!(isValid && dirty)}
                                    onClick={handleSubmit} 
                                    style={{
                                        // opacity: !(isValid && dirty) ? 0.5 : 1
                                    }}
                                    type='submit'
                                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-fit self-start sm:self-auto"
                                >
                                    <span className='text-white'>Save changes</span>
                                    <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />
                                </button>                            
                            </div>
                        </>
                    )}
                </Formik>
                
                <div className='flex flex-col gap-6 w-full max-w-2xl'>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Sensitive information</h1>                    
                   
                    {/* Email */}
                    <Formik
                        validationSchema={yup.object().shape({
                            email: yup.string().email("Must be a valid email address").required("Email required")
                        })}
                        initialValues={{
                            email: profile?.email
                        }}
                        onSubmit={values => {
                            openValidateEmailModal({ data: values })
                        }}
                    >
                        {({ isValid, dirty, values, handleBlur, handleChange, handleSubmit }) => (
                            <div>
                                <div className='mb-3'>
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Email
                                    </label>
                                    <input
                                        name='email'
                                        type="email"
                                        value={values.email}
                                        placeholder='Email address'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />     
                                    <ErrorMessage name='email'>
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                    </ErrorMessage>                    
                                </div>

                                <button 
                                    disabled={!(isValid && dirty) ? true : false}
                                    onClick={handleSubmit} 
                                    style={{
                                        opacity: !(isValid && dirty) ? 0.5 : 1
                                    }}
                                    type='submit'
                                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-fit self-start sm:self-auto"
                                >
                                    <span className='text-white'>Verify</span>
                                    <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />
                                </button>                                   
                            </div>
                        )}
                    </Formik>

                    {/* Phone number */}
                    <div>
                        <Formik
                            validationSchema={yup.object().shape({
                                phone_number: yup.string()
                                    .required('Phone number is required')
                                    .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),                                
                                })}
                                initialValues={{
                                    phone_number: '',
                                    countryCode: '+234'
                                }}
                                onSubmit={values => {
                                    const phone_number = values.phone_number
                                    const country_code = values.countryCode
        
                                    setApiReqs({ isLoading: true, errorMsg: null })

                                    updatePhoneNumber({ requestBody: { phone_number, country_code, user_id: profile?.provider_id }})
                                }}
                        >
                            {({ values, isValid, dirty, handleChange, handleBlur, handleSubmit }) => (
                                <div>
                                    <div className='mb-3'>
                                        <p className="mb-3 p-0 text-sm font-light">
                                            Phone number 
                                            <br /> 
                                            <span className=''>(Current: {phone_number?.phone_number && phone_number?.country_code ? `${phone_number?.country_code} ${phone_number?.phone_number}` : "not set"})</span>
                                        </p>

                                        <div className="flex">
                                            <div className="w-1/5 flex items-center px-4 py-0 border border-gray-300 rounded bg-gray-50">
                                                <Icon icon="twemoji:flag-nigeria" className="w-6 h-6 mr-2" />
                                                <span className="text-gray-600 text-sm">+234</span>
                                                <Icon icon="material-symbols:keyboard-arrow-down" className="w-4 h-4 text-gray-400 ml-1" />
                                            </div>
                                            <input
                                                name={'phone_number'}
                                                className="w-4/5 py-3 px-4 py-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                value={values.phone_number}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type={"tel"} 
                                                // label={"Phone number"} 
                                            />                                        
                                        </div> 
                                        <ErrorMessage name='phone_number'>
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                        </ErrorMessage>                                                                                    
                                    </div>

                                    <button 
                                        disabled={!(isValid && dirty)}
                                        onClick={handleSubmit} 
                                        style={{
                                            opacity: !(isValid && dirty) ? 0.5 : 1
                                        }}
                                        type='submit'
                                        className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-fit self-start sm:self-auto"
                                    >
                                        <span className='text-white'>Update phone number</span>
                                        <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />
                                    </button>                                                                            
                                </div>
                            )}
                        </Formik>
                    </div>

                    <div className='pb-3' />

                    <hr />

                    {/* Password */}
                    <div>
                        <h1 className='mb-3'>
                            Password
                        </h1>
                        <Formik
                            validationSchema={yup.object().shape({
                                old_password: yup.string()
                                    .required('Old password is required'),
                                new_password: yup.string()
                                    .required('New password is required')
                                    .min(8, 'Password must be at least 8 characters')
                                    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                                    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                                    .matches(/\d/, 'Password must contain at least one number')
                                    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),                                    
                            })}
                            initialValues={{
                                old_password: '',
                                new_password: ''
                            }}

                            onSubmit={(values, { resetForm }) => {
                                console.log(values)
                                updatePassword(values)
                                resetForm()
                            }}
                        >
                            {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty }) => (
                                <div className=''>
                                    <div className='mb-3'>
                                        <FormInput
                                            name={'old_password'}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            value={values.old_password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type={oldPasswordVisible ? "text" : "password"} 
                                            placeholder={"Your old password"} 
                                            label={"Old Password"} 
                                            icon={
                                                oldPasswordVisible
                                                ?
                                                    <Eye className="cursor-pointer" onClick={toggleOldPasswordVisibility} size={20} color="#6F3DCB" />
                                                :
                                                    <EyeOff className="cursor-pointer" onClick={toggleOldPasswordVisibility} size={20} color="#6F3DCB" />              
                                            }
                                        />
                                        <ErrorMessage name='old_password'>
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                        </ErrorMessage>
                                    </div>

                                    <div className='mb-3'>
                                        <FormInput
                                            name={'new_password'}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            value={values.new_password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type={newPasswordVisible ? "text" : "password"} 
                                            placeholder={"Type a new password"} 
                                            label={"New Password"} 
                                            icon={
                                                newPasswordVisible
                                                ?
                                                    <Eye className="cursor-pointer" onClick={toggleNewPasswordVisibility} size={20} color="#6F3DCB" />
                                                :
                                                    <EyeOff className="cursor-pointer" onClick={toggleNewPasswordVisibility} size={20} color="#6F3DCB" />              
                                            }
                                        />
                                        <ErrorMessage name='new_password'>
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                        </ErrorMessage>
                                    </div>  

                                    <button 
                                        disabled={!(isValid && dirty)}
                                        onClick={handleSubmit} 
                                        style={{
                                            opacity: !(isValid && dirty) ? 0.5 : 1
                                        }}
                                        type='submit'
                                        className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-fit self-start sm:self-auto"
                                    >
                                        <span className='text-white'>Update password</span>
                                        <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />
                                    </button>                                                                       
                                </div>                
                            )}
                        </Formik>                                       
                    </div> 
                </div>               
            </div>

            <ValidateEmailModal 
                modalProps={validateEmailModal}
                apiReqs={apiReqs}
                setApiReqs={setApiReqs}
            />    
        </div>
    );
};

export default IndividualProfilePage;