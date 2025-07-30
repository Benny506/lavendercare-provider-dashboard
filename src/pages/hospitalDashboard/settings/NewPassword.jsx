import Form from "@/components/Form"
import FormInput from "@/components/FormInput"
import TopDivider from "@/components/TopDivider"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NewPassword = () => {
    const navigate = useNavigate()
    return (
        <div>
            <TopDivider />
            <h2 className="font-extrabold text-xl mb-3">Security</h2>
            <div className="w-full py-20 bg-white rounded-2xl flex items-center justify-center">
                <div className="w-lg flex flex-col p-6">
                    <Form formName={"Create New Password"} formDescription={"Create a new password"} />

                    <form className="w-full flex flex-col gap-4 mt-1">
                        <FormInput type={"password"} id={"create-password"} placeholder={"Create password"} label={"Create Password"} />

                        <FormInput type={"password"} id={"confirm-password"} placeholder={"Re-Type password"} label={"Confirm Password"} />

                        <Button
                            className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 mt-1 cursor-pointer" onClick={() => navigate("")}
                        >
                            Create Password
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPassword