import OtpForm from '@/components/OtpForm'
import TopDivider from '@/components/TopDivider'
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const navigate = useNavigate();
  return (
    <div>
        <TopDivider />
      <h2 className="font-extrabold text-xl mb-3">Security</h2>
      <div className="w-full py-20 bg-white rounded-2xl flex items-center justify-center">
        <OtpForm name={"Email Verification"} btnName={"Recover Password"} navigationTo={'/hospital/dashboard/settings/security/new-password'} changeEmailNavigation={"/recover-password"} showBackLink={false}/>
      </div>
        
    </div>
  )
}

export default Otp