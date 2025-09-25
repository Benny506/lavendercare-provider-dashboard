import OtpForm from '@/components/OtpForm'
import supabase, { createOrUpdateOtp, validateOtp } from '@/database/dbInit'
import { onRequestApi } from '@/lib/requestApi'
import { generateNumericCode } from '@/lib/utils'
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialSeconds = 30

const EmailVerification = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { state } = useLocation()

  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })

  useEffect(() => {
    const { isLoading, data } = apiReqs

    if(isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop());

    if(isLoading && data){
      const { type, requestInfo } = data

      if(type == 'createProvider'){
        onRequestApi({
          requestInfo,
          successCallBack: createProviderSuccess,
          failureCallback: createProviderFailure
        })
      }
    }

  }, [apiReqs])

  useEffect(() => {
    if(!state?.email || !state?.password){
      navigate(-1)
    }
  }, [state])

  const createProviderSuccess = ({ result }) => {
    try {

      setApiReqs({ isLoading: false, errorMsg: null })
      
      navigate('/login')

      toast.success("Provider created! Login to access your account!")

      return;
      
    } catch (error) {
      console.log(error)
      return createProviderFailure({ errorMsg: 'Something went wrong! Try again' })
    }
  }
  const createProviderFailure = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg })
    toast.error(errorMsg)
  }

  if(!state?.email || !state?.password) return <></>

  const { email, password, provider_name } = state  

  const onOtpVerified = () => {
    setApiReqs({
      isLoading: true,
      errorMsg: null,
      data: {
        type: 'createProvider',
        requestInfo: {
          url: 'https://tzsbbbxpdlupybfrgdbs.supabase.co/functions/v1/register-individual-provider',
          method: "POST",
          data: {
            email, password, provider_name
          }
        }
      }
    })
    
    return
  }

  return (
    <OtpForm 
      email={email}      
      name={"Email Verification"} 
      btnName={"Verify email"} 
      onOtpVerified={onOtpVerified}
      setApiReqs={setApiReqs}
      isForgotPassword={true}
      // changeEmailNavigation={"/individual"}
    />
  )
}

export default EmailVerification