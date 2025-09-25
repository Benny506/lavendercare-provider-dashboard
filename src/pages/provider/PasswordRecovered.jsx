import VerificationSuccess from "@/components/VerificationSuccess";

const PasswordRecovered = () => {
    return (
        <VerificationSuccess title={"Password Recovered"} description={"You have successfully changed your password"} buttonText={"Goto login"} redirectTo={"/"} />
    );
}

export default PasswordRecovered