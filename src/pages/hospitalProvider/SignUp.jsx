import ProviderAccount from "@/components/ProviderAccount";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const Navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center">

        <div className="absolute top-8 right-10">
            <ProviderAccount />
        </div>
        
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-2xl px-10 pt-10 pb-4  flex flex-col items-center mt-10">
        <h1 className="text-xl font-bold mb-2 text-left w-full">Hospital Sign Up</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-base">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalName" className="mb-1 text-sm">Hospital Name</label>
            <input id="hospitalName" type="text" placeholder="Type your Hospital name" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalEmail" className="mb-1 text-sm">Hospital Email Address</label>
            <input id="hospitalEmail" type="email" placeholder="Type your Email Address" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="password" className="mb-1 text-sm">Create Password</label>
            <input id="password" type="password" placeholder="Create password" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="confirmPassword" className="mb-1 text-sm">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Re-Type password" className="border border-[#B1B1B0] focus:outline-none rounded-lg px-4 py-2 bg-white" />
          </div>
          <Button type="submit" className="bg-primary-600 text-white rounded-full py-7 font-semibold text-lg mt-4 w-full cursor-pointer" onClick={() => Navigate('/hospital-provider/verification')}>Create Account</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;