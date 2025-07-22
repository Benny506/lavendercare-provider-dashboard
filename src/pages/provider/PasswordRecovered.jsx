import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PasswordRecovered = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
                <div className="w-full max-w-md flex flex-col items-center mt-8">
                    <div className="flex flex-col items-center">
                        <img src="/assets/accept.svg" alt="OTP" className="h-16 w-16 mb-4" />
                        <h1 className="text-3xl font-bold mb-2 text-center">Password Recovered</h1>
                        <p className="m-1 mb-3 text-center text-gray-700 text-base">You have successfully changed your password</p>
                    </div>
                </div>

                <Button className="w-full max-w-md bg-primary-600 outline-none border-none rounded-3xl text-white py-4 px-6 h-14 mt-1" onClick={() => navigate("/")}>
                    Goto Dashboard
                </Button>
            </div>
        </div>
    );
}

export default PasswordRecovered