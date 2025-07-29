import VerificationSuccess from '@/components/VerificationSuccess'
import React from 'react'

const AccountCreated = () => {
  return (
    <VerificationSuccess title={"Account Created Successful"} description={"Your profile is under review. We’ll notify you once verified. Expected turnaround: 2–3 business days."} buttonText={"Login"} />
  )
}

export default AccountCreated