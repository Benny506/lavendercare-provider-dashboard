import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Image from "./ui/image";

const VerificationSuccess = ({ title, description, buttonText, redirectTo = "/login", icon}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center bg-opacity-70 rounded-xl px-8 py-10">
        <div className="w-full flex flex-col items-center mt-8">
          <Image src="/assets/accept.svg" alt="Success" className="h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
          <p className="m-1 mb-3 text-center text-gray-700 text-base w-full">{description}</p>
        </div>

        <Button
          className="w-full max-w-md bg-primary-600 outline-none border-none rounded-3xl text-white py-6 px-6 mt-1 flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate(redirectTo, { replace: true })}
        >
          <span className="text-lg">{buttonText}</span>
          <Icon icon={icon} style={{ width: "1.5rem", height: "1.5rem" }} />
        </Button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
