import VerificationSuccess from '@/components/VerificationSuccess'
import React from 'react'

const EmailVerificationSuccess = () => {
  return (
    <VerificationSuccess title={"Email Verification Successful"} description={"Process to fill the form to get stated"} buttonText={"Basic Info"} icon={"mdi-light:arrow-right"} redirectTo={"/hospital-provider/hospital-information"} />
  )
}

export default EmailVerificationSuccess