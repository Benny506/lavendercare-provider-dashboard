import VerificationSuccess from "@/components/VerificationSuccess";
import AuthImg from "./auxiliary/AuthImg";
import Image from "@/components/ui/image";

const PasswordRecovered = () => {
    return (
        <div className="flex items-stretch justify-between">
            <div className="h-100 min-h-screen lg:block hidden">
                <AuthImg />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="lg:hidden block py-5">
                    <Image className="h-full mb-3" src='/assets/lavendercare-logo.svg' />
                </div>
                <VerificationSuccess title={"Password Recovered"} description={"You have successfully changed your password"} buttonText={"Goto login"} redirectTo={"/"} />
            </div>
        </div>
    );
}

export default PasswordRecovered