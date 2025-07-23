// import { useNavigate } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
import OtpForm from "@/components/OtpForm";

const EmailVerification = () => {
  // const navigate = useNavigate();
  return (
    <OtpForm name={"Email Verification"} btnName={"Recover Password"} navigationTo={"/hospital-provider/verification-success"} changeEmailNavigation={"/hospital-provider"}/>

  );
};

export default EmailVerification;



// <div className="flex flex-col items-center justify-center">

//   <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">

//   {/* Back link */}
//   <div className="absolute top-20 left-10 flex items-center gap-2">
//     <button type="button" onClick={() => navigate('/recover-password')} className="relative text-primary-600 text-base flex items-center gap-1 font-extrabold left-15 top-3">
//       <Icon icon="mdi-light:arrow-left" className="text-[30px]" />
//       <span>Back</span>
//     </button>
//   </div>

//   {/* OTP Card centered */}
//   <div className="w-full max-w-md flex flex-col items-center mt-8">
//     <div className="flex flex-col items-center">
//       <img src="/assets/email-icon.svg" alt="OTP" className="h-16 w-16 mb-4" />
//       <h1 className="text-3xl font-bold mb-2 text-center">Email Verification</h1>
//       <p className="mb-2 text-center text-gray-700 text-base">Enter the 6-digit code we have sent to</p>
//       <p className="mb-6 text-center font-bold text-lg text-primary-900">janed****@gmail.com</p>
//     </div>

//     {/* OTP Inputs */}
//     <div className="flex justify-center gap-3 mb-4">
//       {[...Array(6)].map((_, i) => (
//         <input
//           key={i}
//           type="text"
//           maxLength={1}
//           className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none"
//         />
//       ))}
//     </div>

//     {/* Timer */}
//     <div className="mb-4 text-center text-gray-700 font-semibold">0:30</div>

//     {/* Recover password button */}
//     <Button className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white py-6 px-6 cursor-pointer" onClick={() => navigate("/create-password")}>
//       Recover password
//     </Button>

//     {/* Change email link */}
//     <div className="text-center">
//       <span className="text-gray-700 cursor-pointer">I entered the wrong Email. </span>
//       <button type="button" className="text-primary-600 font-bold mt-2 cursor-pointer">Change Email</button>
//     </div>

//   </div>
// </div>

// </div>
