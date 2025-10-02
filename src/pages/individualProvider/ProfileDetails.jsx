import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ProviderAccount from "@/components/ProviderAccount";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { ErrorMessage, Formik } from "formik";
import FormInput from "@/components/FormInput";
import ErrorMsg1 from "@/components/ErrorMsg1";
import { Square, SquareCheckBig } from "lucide-react";
import { toast } from "react-toastify";
import { specializations } from "@/redux/slices/userDetailsSlice";
import OtpForm from "@/components/OtpForm";

const MAX_FILE_SIZE = 5 * 1024 * 1024


const ProfileDetails = () => {
    const navigate = useNavigate()

    const [profileImgPreview, setProfileImgPreview] = useState(null)

    const validationSchema = yup.object().shape({
        professional_title: yup
            .string()
            .required("Professional title is required"),

        provider_bio: yup
            .string()
            .required("Provider bio is required")
            .max(300, "Maximum of 300 characters"),

        provider_specialties: yup
            .array()
            // .min(1, "Select at least one specialization")
            .required("Provider specialties is required"),

        profile_img: yup
            .mixed()
            .required('Provider image is required')
            .test(
                'is-file',
                'You must select a file',
                value => value instanceof File
            )
            .test(
                'file-type',
                'Only image files are allowed',
                value => value && value.type.startsWith('image/')
            )
            .test(
                'file-size',
                'File must be smaller than 5 MB',
                value => value && value.size <= MAX_FILE_SIZE
            )
    })

    return (
        <div className="flex flex-col items-center justify-center overflow-x-hidden">
            <div className="hidden md:block absolute top-8 right-10 z-10 mb-10">
                <ProviderAccount />
            </div>
            <div className="my-5 max-w-[340px] md:max-w-lg bg-white rounded-2xl px-4 md:px-8 py-10 flex flex-col items-center shadow-none">
                <h1 className="text-2xl font-bold mb-1 text-left w-full">Individual Provider Sign Up</h1>
                <p className="mb-6 text-left text-gray-700 w-full text-sm">
                    This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
                </p>

                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        profile_img: '', professional_title: '',
                        provider_bio: '', provider_specialties: ''
                    }}
                    onSubmit={values => {
                        navigate('/individual/credentials', { state: { profileDetails: values } })
                        toast.info("One more step left! Kindly provide your credentials")

                        return;
                    }}
                >
                    {({ values, setFieldValue, handleBlur, handleChange, setFieldTouched, handleSubmit, isValid, dirty }) => (
                        <div className="w-full flex flex-col gap-4">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-start mb-2">
                                <div className="font-semibold mb-1">Profile Picture</div>
                                <div className="flex items-center justify-between gap-3">
                                    <input
                                        name="profile_img"
                                        type="file"
                                        accept="image/*"
                                        placeholder="Click to select file"
                                        className="border border-gray-300 rounded px-3 py-2 w-4/5 text-base focus:outline-none focus:ring-2 focus:ring-primary-200"
                                        onChange={e => {
                                            const file = e.currentTarget.files?.[0] ?? null

                                            if(!file){
                                                setProfileImgPreview(null)
                                            }

                                            setFieldValue("profile_img", file)

                                            if (file) {
                                                const reader = new FileReader()
                                                reader.onloadend = () => {
                                                    // reader.result is a base64 data-URL
                                                    setProfileImgPreview(reader.result)
                                                }
                                                reader.readAsDataURL(file)

                                            }
                                        }}
                                    />

                                    <div className="p-1 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
                                        {
                                            profileImgPreview
                                                ?
                                                <img src={profileImgPreview} alt="Profile image" style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
                                                :
                                                <Icon icon="mdi:account-circle-outline" className="text-4xl text-gray-400" />
                                        }
                                    </div>
                                </div>

                                <ErrorMessage name="profile_img">
                                    {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                </ErrorMessage>
                            </div>

                            {/* Professional Title */}
                            <div>
                                <div className="font-semibold mb-1">Professional Title</div>
                                <FormInput
                                    name={'professional_title'}
                                    value={values.professional_title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type={"text"}
                                    placeholder='e.g., "Certified Lactation Consultant", "Doula", "OB-GYN"'
                                    className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200"
                                />

                                <ErrorMessage name="professional_title">
                                    {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                </ErrorMessage>
                            </div>

                            {/* Bio / Professional Summary */}
                            <div>
                                <div className="font-semibold mb-1">Bio / Professional Summary</div>
                                <textarea
                                    name={'provider_bio'}
                                    value={values.provider_bio}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{
                                        minWidth: '100%',
                                        minHeight: '250px'
                                    }}
                                    placeholder="Describe your experience -300 characters"
                                    className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200"
                                />

                                <ErrorMessage name="provider_bio">
                                    {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                                </ErrorMessage>
                            </div>

                            {/* Specializations */}
                            <div>
                                <div className="font-semibold mb-1">Specializations (Multi-select)</div>
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
                                                className="flex items-center justify-start cursor-pointer gap-2 select-none"
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
                            {/* Next Button */}
                            <button
                                disabled={!(isValid && dirty)}
                                style={{
                                    opacity: !(isValid && dirty) ? 0.5 : 1
                                }}
                                onClick={handleSubmit}
                                type="button"
                                className="cursor-pointer bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2"
                            >
                                Next <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
                            </button>
                            {/* Skip link */}
                            <div className="flex justify-end items-center w-full mt-2">
                                {/* <button type="button" className="text-primary-600 font-semibold text-base bg-transparent px-0 py-0 hover:underline">Skip</button> */}

                                {/* Pagination dots */}
                                <div className="flex justify-center items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                                    <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                                    <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
            <div className="block md:hidden my-4">
                <ProviderAccount className="mx-auto justify-center" />
            </div>
        </div>
    );
};

export default ProfileDetails;
