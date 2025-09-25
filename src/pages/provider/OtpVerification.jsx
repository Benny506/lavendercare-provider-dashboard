import OtpForm from "@/components/OtpForm";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { state } = useLocation()

  const email = state?.email

  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

  useEffect(() => {
    if(!email){
      // navigate('/', { replace: true })
      navigate(-1)
      toast.info("Email not found")
      return;
    }
  }, [])

  useEffect(() => {
    const { isLoading, data } = apiReqs

    if(isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop());

  }, [apiReqs])  

  const onOtpVerified = () => {
    setApiReqs({ isLoading: false, errorMsg: null, data: null })
    dispatch(appLoadStop())

    navigate('/create-password', { state: { email } })

    return;
  }

  if(!email) return <></>

  return (
    <OtpForm
      email={email}
      name={"Email Verification"}
      btnName={"Verify email"}
      onOtpVerified={onOtpVerified}
      setApiReqs={setApiReqs}
      requiresAuth={true}
      credentialsInUseCallback={() => alert("ALSO HERE")}
    // changeEmailNavigation={"/individual"}
    />
  );
};

export default OtpVerification;
