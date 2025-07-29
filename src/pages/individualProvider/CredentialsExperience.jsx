import React from "react";
import { Icon } from "@iconify/react";

const CredentialsExperience = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-full max-w-xl bg-white rounded-2xl px-8 py-10 flex flex-col items-center shadow-none">
        <h1 className="text-2xl font-bold mb-1 text-left w-full">Credentials & Experience</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-sm">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-4">
          {/* License / Certification Number */}
          <div>
            <div className="font-semibold mb-1">License / Certification Number</div>
            <input type="text" placeholder="Input your Certification Number" className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
          </div>
          {/* Upload Credential Document */}
          <div>
            <div className="font-semibold mb-1">Upload Credential Document</div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
              <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
              <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
              <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
              <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button>
            </div>
          </div>
          {/* Years of Experience */}
          <div>
            <div className="font-semibold mb-1">Years of Experience</div>
            <input type="text" placeholder="e.g., 1–30 years" className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
          </div>
          {/* Affiliations */}
          <div>
            <div className="font-semibold mb-1">Affiliations <span className="text-xs text-gray-500 font-normal">(Optional)</span></div>
            <input type="text" placeholder="Are you affiliated to any hospitals /clinics" className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
          </div>
          {/* Next Button */}
          <button type="button" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2">
            Next <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
          </button>
          {/* Skip link */}
          <div className="flex justify-between items-center w-full mt-2">
            <button type="button" className="text-primary-600 font-semibold text-base bg-transparent px-0 py-0 hover:underline">Skip</button>
            {/* Pagination dots */}
            <div className="flex justify-center items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CredentialsExperience;
