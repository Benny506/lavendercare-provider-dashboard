import AppLoading from "@/components/appLoading/AppLoading";
import ErrorMsg1 from "@/components/ErrorMsg1";
import FormInput from "@/components/FormInput";
import OtpForm from "@/components/OtpForm";
import supabase from "@/database/dbInit";
import { requestApi } from "@/lib/requestApi";
import { appLoadStop } from "@/redux/slices/appLoadingSlice";
import { getUserDetailsState, setUserDetails } from "@/redux/slices/userDetailsSlice";
import { Icon } from "@iconify/react";
import { ErrorMessage, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from 'yup'

export default function ValidateEmailModal({ modalProps, apiReqs, setApiReqs }){
    const dispatch = useDispatch()

    const profile = useSelector(state => getUserDetailsState(state).profile)
    const user = useSelector(state => getUserDetailsState(state).user)

    const [otpVerified, setOtpVerified] = useState(false)
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)

    const toggleOldPasswordVisibility = () => setOldPasswordVisible(prev => !prev)

    useEffect(() => {
        if(!modalProps?.visible){
            setOtpVerified(false)
            setOldPasswordVisible(false)
        }
    }, [modalProps])

    if(!modalProps || !apiReqs || !setApiReqs) return <></>

    const { visible, hide, data } = modalProps

    if(!visible || !hide || !data) return <></>

    const { email } = data

    const updateEmail = async ({ old_password }) => {
        try {

            setApiReqs({ isLoading: true, errorMsg: null })

            const { responseStatus, result, errorMsg } = await requestApi({ 
                url: 'https://tzsbbbxpdlupybfrgdbs.supabase.co/functions/v1/update-user-email', 
                method: 'POST',
                data: {
                    new_email: email, 
                    current_email: user?.email,
                    current_password: old_password
                }
            })
            
            if(!result || errorMsg){
                console.log(errorMsg)
                throw new Error()
            }

            const { newSession } = result

            await supabase.auth.setSession(newSession)            

            dispatch(setUserDetails({
                user: {
                    ...user,
                    email
                }
            }))

            toast.success("Email updated")

            setApiReqs({ isLoading: false, errorMsg: null })

            dispatch(appLoadStop())

            return hide && hide();
            
        } catch (error) {
            console.log(error)
            return updateEmailFailure({ errorMsg: 'Something went wrong! Try again! You sure that password is correct?' })
        }
    }
    const updateEmailFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg })
        toast.error(errorMsg)

        return;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">

            {/* {
                apiReqs.isLoading
                &&
                    <AppLoading tempLoading={true} />
            } */}

            <div className="bg-img rounded-xl p-4 w-full h-full max-h-[80vh] lg:max-w-[60vw] w-full shadow-xl relative">
                <div className="bg-white rounded-2xl shadow-xl w-full h-full flex flex-col">
                    {
                        otpVerified
                        ?
                            <Formik
                                validationSchema={yup.object().shape({
                                    old_password: yup.string()
                                        .required('Current password is required')
                                })}   
                                initialValues={{
                                    old_password: ''
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    updateEmail(values)

                                    resetForm()
                                }}        
                            >
                                {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty }) => (
                                    <div className="p-3">
                                        <div className='mb-3'>
                                            <FormInput
                                                name={'old_password'}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                value={values.old_password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type={oldPasswordVisible ? "text" : "password"} 
                                                placeholder={"Your current passord"} 
                                                label={"Current Password"} 
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

                                        <button 
                                            disabled={!(isValid && dirty)}
                                            onClick={handleSubmit} 
                                            style={{
                                                opacity: !(isValid && dirty) ? 0.5 : 1
                                            }}
                                            type='submit'
                                            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-fit self-start sm:self-auto"
                                        >
                                            <span className='text-white'>Confirm password</span>
                                            <Icon icon="material-symbols:edit" className="w-4 h-4 text-white" />
                                        </button>                                         
                                    </div>
                                )}
                            </Formik>       
                        :                     
                            <OtpForm 
                                backBtnFunc={hide}
                                name={'Update email'} 
                                email={email} 
                                btnName={"Verify"}
                                onOtpVerified={() => {
                                    setOtpVerified(true)
                                    setApiReqs({ isLoading: false, errorMsg: null })
                                }} 
                                setApiReqs={setApiReqs}
                                credentialsInUseCallback={() => {}}
                            />                        
                    }
                </div>            
            </div>
        </div>
    )
}