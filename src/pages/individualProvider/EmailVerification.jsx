import OtpForm from '@/components/OtpForm'
import React from 'react'

const EmailVerification = () => {
  return (
    <OtpForm name={"Email Verification"} btnName={"Continue"} navigationTo={"/individual/verification-success"} changeEmailNavigation={"/individual"}/>
  )
}

export default EmailVerification