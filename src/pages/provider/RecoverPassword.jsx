import { useNavigate } from "react-router-dom";
import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";

const RecoverPassword = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
                <Form formName={"Recover your Password"} formDescription={"Enter your email to recover your LavenderCare password"} />
                <form className="w-full flex flex-col gap-4">
                    <FormInput type={"email"} placeholder={"Type your email address"} label={"Email Address"} />
                    <Button
                        className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 cursor-pointer" onClick={() => navigate("/otp-verification")}
                    >
                        Send OTP
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;


{/* <div className="relative min-h-screen flex flex-col justify-center items-center bg-transparent">

            {/* Back arrow and P */}
            // <div className="absolute top-20 left-10 flex items-center gap-2">
            //     <button type="button" onClick={() => navigate(-1)} className="text-primary-600 text-2xl">
            //         <Icon icon="ph:arrow-left" />
            //     </button>
            //     <span className="text-primary-600 font-semibold text-lg">P</span>
            // </div>

            // {/* Form Card centered */}
            // <div className="w-full max-w-md flex flex-col items-center mt-8">
            //     <h1 className="text-3xl font-bold mb-2 text-center">Recover your password</h1>
            //     <p className="mb-6 text-center text-gray-700 text-base">Enter your email to recover your LavenderCare password.</p>
            //     <form className="w-full flex flex-col gap-4" onSubmit={e => {e.preventDefault(); navigate('/provider/otp-verification');}}>
            //         <div className="flex flex-col text-left">
            //             <label htmlFor="email" className="mb-1 text-sm font-medium">Email Address</label>
            //             <input id="email" type="email" placeholder="Type your email address" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 text-base" />
            //         </div>
            //         <button type="submit" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-2 hover:bg-primary-700 transition w-full">Send OTP</button>
            //     </form>
            // </div>
        // </div> */}