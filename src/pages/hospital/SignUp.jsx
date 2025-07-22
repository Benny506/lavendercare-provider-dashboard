import ProviderAccount from "@/components/ProviderAccount";
import React from "react";

const SignUp = () => {
  return (
    <div className=" flex flex-col items-center justify-center">

        <div className="absolute top-8 right-10">
            <ProviderAccount />
        </div>
        
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-2xl px-10 py-10 flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-2 text-left w-full">Hospital Sign Up</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-base">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalName" className="mb-1 text-sm font-medium">Hospital Name</label>
            <input id="hospitalName" type="text" placeholder="Type your Hospital name" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="hospitalEmail" className="mb-1 text-sm font-medium">Hospital Email Address</label>
            <input id="hospitalEmail" type="email" placeholder="Type your Email Address" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Create Password</label>
            <input id="password" type="password" placeholder="Create password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Re-Type password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white" />
          </div>
          <button type="submit" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;