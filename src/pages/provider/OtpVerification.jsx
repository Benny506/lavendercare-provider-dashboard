import OtpForm from "@/components/OtpForm";

const OtpVerification = () => {
  return (
    <OtpForm name={"Email Verification"} btnName={"Recover Password"} navigationTo={"/create-password"} changeEmailNavigation={"/recover-password"}/>
  );
};

export default OtpVerification;
