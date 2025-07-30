import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const IndividualAccountCreated = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
                <div className="w-full max-w-md flex flex-col items-center mt-8">
                    <div className="flex flex-col items-center">
                        <Image src="/assets/accept.svg" alt="OTP" className="h-16 w-16 mb-4" />
                        <h1 className="text-3xl font-bold mb-2 text-center">Account Created Successful</h1>
                        <p className="m-1 mb-3 text-center text-gray-700 text-base">Your profile is under review. We’ll notify you once verified. Expected turnaround: 2–3 business days.</p>
                    </div>
                </div>

                <Button
                    className="w-full max-w-md bg-primary-600 outline-none border-none rounded-3xl text-white py-6 px-6 mt-1 flex items-center justify-center gap-2"
                    onClick={() => navigate("/login")}
                >
                    <span className="text-lg">Login</span>
                    {/* <Icon icon="mdi-light:arrow-right" className="" style={{ width: "1.5rem", height: "1.5rem" }} /> */}
                </Button>
            </div>
        </div>
    );
}

export default IndividualAccountCreated