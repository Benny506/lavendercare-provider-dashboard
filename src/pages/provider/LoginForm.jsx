import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { ErrorMessage, Formik } from "formik";
import ErrorMsg1 from "@/components/ErrorMsg1";
import { useDispatch } from "react-redux";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { toast } from "react-toastify";
import supabase, { individualProviderLogin } from "@/database/dbInit";
import { setUserDetails } from "@/redux/slices/userDetailsSlice";
import { setNotifications } from "@/redux/slices/notificationSlice";

const LoginForm = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })

  useEffect(() => {
    const { isLoading } = apiReqs

    if(isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop());
  }, [apiReqs])

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)

  const login = async ({ email, password }) => {
    try {

      setApiReqs({ isLoading: true, errorMsg: null })

      const { data, errorMsg } = await individualProviderLogin({ email, password })

      if(errorMsg) {
        setApiReqs({ isLoading: false, errorMsg })
        toast.error(errorMsg)

        return
      }

      if(!data) throw new Error();

      const { user, availability, bookingCostData, bookings, screenings, notifications, highRiskAlerts, session } = data

      dispatch(setUserDetails({ profile: user, availability, bookingCostData, bookings, screenings, highRiskAlerts }))

      dispatch(setNotifications({ notifications }))

      setApiReqs({ isLoading: false, errorMsg: null })      

      if(!user?.credentials_approved){
        if(!user?.certification_number){
          toast.info("Next step -> complete your registration")

          navigate('/individual/profile-details');

          return;
        }

        if(user?.certification_number){
          toast.info("Credentials submitted and are awaiting approval. We will reach out to you via email soon")
        }
      }

      navigate('/individual/dashboard')

      return;

      
    } catch (error) {
      console.log(error)

      const errorMsg = 'Login error!'

      setApiReqs({ isLoading: false, errorMsg })
      toast.error(errorMsg)

      return;
    }
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email address required"),
    
    password: yup
      .string()
      .required("Password required")
  })

  return (
    <div className="flex flex-col items-center justify-center">

      <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
        <Form formName={"Login"} formDescription={"Enter your email and password to Login"} />

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '', password: ''
          }}
          onSubmit={(values) => {
            login(values)
          }}
        >
          {
            ({ values, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
              <div className="w-full flex flex-col gap-4 mt-2">
                <div>
                  <FormInput 
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={"email"} 
                    placeholder={"Type your business email address"} 
                    label={"Email Address"} 
                  />

                  <ErrorMessage name="email">
                    { errorMsg => <ErrorMsg1 position={'left'} errorMsg={errorMsg} /> }
                  </ErrorMessage>
                </div>
                
                <div>
                  <FormInput 
                    name={'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={passwordVisible ? "text" : "password"} 
                    placeholder={"Type your password"} 
                    label={"Password"} 
                    icon={
                      passwordVisible
                      ?
                        <Eye className="cursor-pointer" onClick={togglePasswordVisibility} size={20} color="#6F3DCB" />
                      :
                        <EyeOff className="cursor-pointer" onClick={togglePasswordVisibility} size={20} color="#6F3DCB" />              
                    }
                  />

                  <ErrorMessage name="password">
                    { errorMsg => <ErrorMsg1 position={'left'} errorMsg={errorMsg} /> }
                  </ErrorMessage>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="text-primary-500 font-bold cursor-pointer" onClick={() => navigate("/recover-password")} >Forgot Password?</button>
                </div>

                <Button
                  disabled={!(isValid && dirty) ? true : false}
                  onClick={handleSubmit}
                  className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white px-6 py-6 cursor-pointer"
                  style={{
                    opacity: !(isValid && dirty) ? 0.5 : 1
                  }}
                >
                  Login
                </Button>

                
                <p className="text-center -mt-2">I am new here. <span className="text-primary-500 font-bold cursor-pointer" onClick={() => navigate('/')} >Create Provider Account</span></p>
              </div>
            )
          }
        </Formik>
      </div>

    </div>
  );
};


export default LoginForm;