import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Image from "./ui/image";
import { formatTimeToMMSS, maskEmail } from "@/lib/utils";
import OTPInput from "./OtpInput";
import { toast } from "react-toastify";
import { createOrUpdateOtp, validateOtp } from "@/database/dbInit";

const initialSeconds = 30

const OtpForm = ({ 
  name, email = "janedoe@gmail.com", btnName, onOtpVerified, setApiReqs
}) => {

  const navigate = useNavigate();

  const [otpInput, setOtpInput] = useState('')
  const [resendTimer, setResendTimer] = useState(initialSeconds)

  useEffect(() => {
    createToken()
  }, [])  

  const resetTimer = () => {
    let seconds = initialSeconds

    const resendInterval = setInterval(() => {
      setResendTimer(seconds)

      if(seconds == 0){
        clearInterval(resendInterval)
        return;
      }
      
      seconds = seconds - 1
      setResendTimer(seconds)
    }, 1000)
  }    

  const handleValidateBtnClick = async() => {
    try {

      setApiReqs({ isLoading: true, errorMsg: null })

      const otpValid = await validateOtp({ otp: otpInput, email })

      if(otpValid){
        toast.success("OTP verified")
        
        return onOtpVerified && onOtpVerified()

      } else {
        return validateOtpFailure({ errorMsg: 'Expired or Invalid OTP'})
      }
      
    } catch (error) {
      console.log(error)
      return validateOtpFailure({ errorMsg: 'Something went wrong! Try again' })
    }
  }
  const validateOtpFailure = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg: null })
    toast.error(errorMsg)

    return;
  }

  const createToken = async () => {
    try {

      setApiReqs({ isLoading: true, errorMsg: null })

      const { token, error } = await createOrUpdateOtp({ email, requiresAuth: false })

      if(!token.otp || !token.expiresAt || error) throw new Error();

      alert("Still working on email validation! For now, enter this token! You only get to see this once! " + token.otp)

      setApiReqs({ isLoading: false, errorMsg: null })

      toast.success("OTP sent to mail")

      resetTimer()

      return;
      
    } catch (error) {
      console.log(error)
      return createTokenError({ errorMsg: 'Something went wrong! Try again' })
    
    }
  }
  const createTokenError = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg })
    toast.error(errorMsg)

    return;
  }   

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">

        {/* Back link */}
        <div className="absolute top-20 left-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer relative text-primary-600 text-base flex items-center gap-1 font-extrabold left-15 top-3"
          >
            <Icon icon="mdi-light:arrow-left" className="text-[30px]" />
            <span>Back</span>
          </button>
        </div>

        {/* OTP Header */}
        <div className="w-full max-w-md flex flex-col items-center mt-8">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/email-icon.svg"
              alt="OTP"
              className="h-16 w-16 mb-4"
            />
            <h1 className="text-3xl font-bold mb-2 text-center">{name}</h1>
            <p className="mb-2 text-center text-gray-700 text-base">
              Enter the 6-digit code we have sent to
            </p>
            <p className="mb-6 text-center font-bold text-lg text-primary-900">
              { maskEmail({ email }) }
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-4">
            <OTPInput 
              onChange={(otp) => setOtpInput && setOtpInput(otp)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Timer */}
          <div className="mb-4 text-center text-gray-700 font-semibold">
            {
              resendTimer && resendTimer > 0
              ?
                formatTimeToMMSS({ seconds: resendTimer })
              :
                <span onClick={createToken} style={{ textDecorationLine: 'underline' }} className="cursor-pointer">
                  Resend code
                </span>
            }
          </div>

          {/* Recover password button */}
          <Button
            className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 cursor-pointer"
            // onClick={() => navigate(navigationTo)}
            onClick={handleValidateBtnClick}
          >
            {btnName}
          </Button>

          {/* Change email link */}
          {/* <div className="text-center mt-4">
            <span className="text-gray-700 cursor-pointer font-medium">
              I entered the wrong Email.{" "}
            </span>
            <button
              type="button"
              className="text-primary-600 font-bold mt-2 cursor-pointer"
              onClick={() => navigate(changeEmailNavigation)}
            >
              Change Email
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
