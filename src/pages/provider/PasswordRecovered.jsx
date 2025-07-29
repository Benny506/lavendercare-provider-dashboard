import VerificationSuccess from "@/components/VerificationSuccess";

const PasswordRecovered = () => {
    return (
        <VerificationSuccess title={"Password Recovered"} description={"You have successfully changed your password"} buttonText={"Goto Dashboard"} redirectTo={"/"} />
    );
}

export default PasswordRecovered