import OtpForm from "@/components/OtpForm";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthImg from "./auxiliary/AuthImg";
import Image from "@/components/ui/image";

const OtpVerification = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { state } = useLocation()

  const email = state?.email

  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

  useEffect(() => {
    if (!email) {
      // navigate('/', { replace: true })
      navigate(-1)
      toast.info("Email not found")
      return;
    }
  }, [])

  useEffect(() => {
    const { isLoading, data } = apiReqs

    if (isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop());

  }, [apiReqs])

  const onOtpVerified = () => {
    setApiReqs({ isLoading: false, errorMsg: null, data: null })
    dispatch(appLoadStop())

    navigate('/create-password', { state: { email } })

    return;
  }

  if (!email) return <></>

  return (
    <div className="flex items-stretch justify-between">
      <div className="h-100 min-h-screen lg:block hidden">
        <AuthImg />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="lg:hidden block py-5">
          <Image className="h-full mb-3" src='/assets/lavendercare-logo.svg' />
        </div>

        <OtpForm
          email={email}
          name={"Email Verification"}
          btnName={"Verify email"}
          onOtpVerified={onOtpVerified}
          setApiReqs={setApiReqs}
          requiresAuth={true}
          credentialsInUseCallback={() => alert("ALSO HERE")}
          backBtnAbsolute={false}
          // backBtnText="Back to login"
        // changeEmailNavigation={"/individual"}
        />
      </div>
    </div>
  );
};

export default OtpVerification;
