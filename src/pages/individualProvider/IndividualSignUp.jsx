import React from "react";
import { Icon } from "@iconify/react";
import ProviderAccount from "@/components/ProviderAccount";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const IndividualSignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center overflow-x-hidden">

      <div className="absolute top-8 right-10">
        <ProviderAccount />
      </div>

      <div className="w-full max-w-xl bg-white rounded-2xl px-10 pt-10 pb-4 mt-10 flex flex-col items-center justify-center">
        
        <h1 className="text-2xl font-bold mb-2 text-left w-full">Individual Provider Sign Up</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-sm">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label className="mb-1 text-sm font-medium">Full Name</label>
            <input type="text" placeholder="Type your Full name" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base"/>
          </div>
          {/* Email Address */}
          <div>
            <div className="font-semibold mb-1">Email Address</div>
            <input type="email" placeholder="Type your Email Address" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base "/>
          </div>
          {/* Official Phone Number */}
          <div>
            <div className="font-semibold mb-1">Official Phone Number</div>
            <div className="flex">
              <select className="border border-[#B1B1B0] focus:outline-none rounded-l px-3 py-2 text-base bg-white" defaultValue="+234">
                <option value="+234">+234</option>
              </select>
              <input type="text" placeholder="Type your Hospital number" className="border-t border-b border-r border-[#B1B1B0] focus:outline-none rounded-r px-3 py-2 w-full text-base"/>
            </div>
          </div>
          {/* Create Password */}
          <div>
            <div className="font-semibold mb-1">Create Password</div>
            <input type="password" placeholder="Create password" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base"/>
          </div>
          {/* Confirm Password */}
          <div>
            <div className="font-semibold mb-1">Confirm Password</div>
            <input type="password" placeholder="Re-Type password" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
          </div>
          {/* Next Button */}
          <Button type="button" className="bg-primary-600 text-white rounded-full py-6 font-semibold text-lg mt-4 w-full flex items-center justify-center cursor-pointer" onClick={() => navigate('/individual/verification')}>
            Next <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
          </Button>
          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualSignUp;