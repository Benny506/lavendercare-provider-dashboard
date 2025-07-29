import Form from '@/components/Form'
import FormInput from '@/components/FormInput'
import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const navigate = useNavigate()
    return (
        <div>
            <TopDivider />
            <h2 className="font-extrabold text-xl mb-3">Security</h2>

            <div className="w-full py-20 bg-white rounded-2xl flex items-center justify-center">
                <div className='max-w-lg flex flex-col p-6'>
                    <Form formName={"Change your Password"} formDescription={"Enter your email to recover your LavenderCare password."} />
                    <form className="w-full flex flex-col gap-4">
                        <FormInput type={"email"} placeholder={"Type your email address"} label={"Email Address"} />
                        <Button
                            className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 cursor-pointer" onClick={() => navigate("/hospital/dashboard/settings/security/otp")}
                        >
                            Send OTP
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword