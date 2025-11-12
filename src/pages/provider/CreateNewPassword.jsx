import ErrorMsg1 from "@/components/ErrorMsg1";
import Form from "@/components/Form"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import { onRequestApi } from "@/lib/requestApi";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { ErrorMessage, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from 'yup'
import AuthImg from "./auxiliary/AuthImg";
import Image from "@/components/ui/image";

const CreateNewPassword = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const { state } = useLocation()
  const email = state?.email

  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  useEffect(() => {
    if (!state?.email) {
      toast.info("Email not found")
      navigate('/', { replace: true });
    }
  }, [state])

  useEffect(() => {
    const { isLoading, data } = apiReqs

    if (isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop());

    if (isLoading && data) {
      const { type, requestInfo } = data

      if (type === 'resetPassword') {
        onRequestApi({
          requestInfo,
          successCallBack: resetPasswordSuccess,
          failureCallback: resetPasswordFailure
        })
      }
    }
  }, [apiReqs])

  const resetPasswordSuccess = ({ result }) => {
    try {

      setApiReqs({ isLoading: false, errorMsg: null, data: null })
      dispatch(appLoadStop())
      toast.success('Password successfully reset')

      navigate('/recovered-password', { replace: true })

    } catch (error) {
      console.error(error)
      return resetPasswordFailure({ errorMsg: 'Something went wrong! Try again.' })
    }
  }
  const resetPasswordFailure = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg, data: null })
    toast.error(errorMsg)

    return;
  }

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prev => !prev)

  return (
    <div className="flex items-stretch justify-between">
      <div className="h-100 min-h-screen lg:block hidden">
        <AuthImg />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="lg:hidden block py-5">
          <Image className="h-full mb-3" src='/assets/lavendercare-logo.svg' />
        </div>

        <Formik
          validationSchema={yup.object().shape({
            password: yup
              .string()
              .required('Password is required')
              .min(8, 'Password must be at least 8 characters')
              .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
              .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
              .matches(/\d/, 'Password must contain at least one number')
              .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),

            confirmPassword: yup
              .string()
              .required('Confirm Password is required')
              .oneOf([yup.ref('password'), null], 'Passwords must match'),
          })}
          initialValues={{
            password: '', confirmPassword: '',
          }}
          onSubmit={values => {
            setApiReqs({
              isLoading: true,
              errorMsg: null,
              data: {
                type: 'resetPassword',
                requestInfo: {
                  url: 'https://tzsbbbxpdlupybfrgdbs.supabase.co/functions/v1/reset-password-from-forgot-password',
                  method: 'POST',
                  data: {
                    new_password: values?.password,
                    email
                  }
                }
              }
            })
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty }) => (
            <div className="w-full flex flex-col items-center justify-center">

              <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
                <Form formName={"Create New Password"} formDescription={"Create a new password"} />

                <div className="w-full flex flex-col gap-4 mt-1">
                  <div className="flex flex-col relative">
                    <label className="text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      name={'password'}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder={"Your password"}
                      required
                      className="border border-grey-300 bg-white placeholder:text-grey-400 rounded-lg px-3 py-2 text-sm focus:outline-none pr-10"
                    />
                    {
                      passwordVisible
                        ?
                        <EyeOff className="cursor-pointer absolute right-3 top-8 text-grey-800" size={16} onClick={togglePasswordVisibility} />
                        :
                        <Eye className="cursor-pointer absolute right-3 top-8 text-grey-800" size={16} onClick={togglePasswordVisibility} />
                    }
                    <ErrorMessage name={'password'}>
                      {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-sm font-medium mb-1">
                      Confirm Password
                    </label>
                    <input
                      name={'confirmPassword'}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      placeholder={"Re-type password"}
                      required
                      className="border border-grey-300 bg-gray-50 placeholder:text-grey-400 rounded-lg px-3 py-2 text-sm focus:outline-none pr-10"
                    />
                    {
                      confirmPasswordVisible
                        ?
                        <EyeOff className="cursor-pointer absolute right-3 top-8 text-grey-800" size={16} onClick={toggleConfirmPasswordVisibility} />
                        :
                        <Eye className="cursor-pointer absolute right-3 top-8 text-grey-800" size={16} onClick={toggleConfirmPasswordVisibility} />
                    }
                    <ErrorMessage name={'confirmPassword'}>
                      {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                    </ErrorMessage>
                  </div>

                  <Button
                    disabled={!(isValid && dirty) ? true : false}
                    className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 mt-1 cursor-pointer"
                    onClick={handleSubmit}
                    style={{
                      opacity: !(isValid && dirty) ? 0.5 : 1
                    }}
                  >
                    Create Password
                  </Button>
                </div>
              </div>

            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateNewPassword