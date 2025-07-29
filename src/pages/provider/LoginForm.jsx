import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center">

      <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
        <Form formName={"Login"} formDescription={"Enter your email and password to Login"} />

        <form className="w-full flex flex-col gap-4 mt-2">
          <FormInput type={"email"} placeholder={"Type your business email address"} label={"Email Address"} />
          <FormInput type={"password"} placeholder={"Type your password"} label={"Password"} />
          <div className="flex justify-end">
            <button type="button" className="text-primary-500 font-bold cursor-pointer" onClick={() => navigate("/recover-password")} >Forgot Password?</button>
          </div>

          <Button
            className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white px-6 py-6 cursor-pointer"
          >
            Login
          </Button>

          
          <p className="text-center -mt-2">I am new here. <span className="text-primary-500 font-bold cursor-pointer" onClick={() => navigate('/individual')} >Create Provider Account</span></p>
        </form>
      </div>

    </div>
  );
};


export default LoginForm;