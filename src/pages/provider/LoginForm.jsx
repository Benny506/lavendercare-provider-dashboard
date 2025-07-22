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
        </form>
      </div>

    </div>
  );
};


export default LoginForm;


{/* <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
      <div className="w-full max-w-md flex flex-col items-center bg-white bg-opacity-70 rounded-xl shadow-md px-8 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Login</h1>
        <p className="mb-6 text-center text-gray-700">Enter your email and password to Login</p>
        <form className="w-full flex flex-col gap-4">
          <FormInput type="email" placeholder="Type your business email address" />
          <FormInput type="password" placeholder="Type your password" />
          <div className="flex justify-end">
            <button type="button" className="text-primary-600 font-semibold text-sm hover:underline">Forgot Password?</button>
          </div>
          <button type="submit" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-2 hover:bg-primary-700 transition w-full">Login</button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">I am new here. </span>
          <button type="button" className="text-primary-600 font-semibold hover:underline">Create Provider Account</button>
        </div>
      </div>
    </div> */}