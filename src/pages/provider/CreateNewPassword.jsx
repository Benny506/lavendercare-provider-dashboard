import Form from "@/components/Form"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
 const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center">

      <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
        <Form formName={"Create New Password"} formDescription={"Create a new password"} />
        
        <form className="w-full flex flex-col gap-4 mt-1">
          <FormInput type={"password"} placeholder={"Create password"} label={"Create Password"}/>
          
          <FormInput type={"password"} placeholder={"Re-Type password"} label={"Confirm Password"} />

          <Button
          className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 mt-1" onClick={() => navigate("/recorverd-password")}
        >
          Create Password
        </Button>
        </form>
      </div>

    </div>
  )
}

export default CreateNewPassword