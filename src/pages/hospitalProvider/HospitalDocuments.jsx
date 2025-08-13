import React from "react";
import { Icon } from "@iconify/react";
import ProviderAccount from "@/components/ProviderAccount";
import { useNavigate } from "react-router-dom";

const HospitalDocuments = () => {
  const Navigate = useNavigate();
  return (
    <div className="-mt-15">
      <div className="hidden md:block absolute top-8 right-10">
        <ProviderAccount />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-transparent mt-16 lg:mt-20">
        <div className="max-w-[340px] md:max-w-xl bg-white rounded-2xl px-4 md:px-8 py-10 flex flex-col items-center shadow-none">
          <h1 className="text-2xl font-bold mb-1 text-left w-full">Document Upload</h1>
          <p className="mb-6 text-left text-gray-700 w-full text-sm">
            Verifies legal accreditation and clinical authority. Necessary for platform compliance.
          </p>
          <form className="w-full flex flex-col gap-4">
            {/* Hospital Registration Certificate */}
            <div>
              <div className="font-semibold mb-1">Hospital Registration Certificate</div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
                <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
                <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
                <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button>
              </div>
            </div>
            {/* Accreditation License / Ministry Approval Letter */}
            <div>
              <div className="font-semibold mb-1">Accreditation License / Ministry Approval Letter</div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
                <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
                <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
                <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button>
              </div>
            </div>
            {/* Medical Director's ID */}
            <div>
              <div className="font-semibold mb-1">Medical Director's ID <span className="text-xs text-gray-500 font-normal">(Optional but recommended)</span></div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
                <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
                <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
                <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button>
              </div>
            </div>
            {/* Insurance Certificate */}
            <div>
              <div className="font-semibold mb-1">Insurance Certificate <span className="text-xs text-gray-500 font-normal">(Optional)</span></div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 flex flex-col items-center text-center mb-2">
                <Icon icon="mdi:cloud-upload-outline" className="text-3xl text-gray-400 mb-2" />
                <div className="text-sm font-medium mb-1">Choose a file or drag & drop it here</div>
                <div className="text-xs text-gray-500 mb-3">PDF, JPG or PNG. Max 10 MB</div>
                <button type="button" className="border border-gray-300 rounded px-4 py-1 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">Browse File</button>
              </div>
            </div>
            {/* Create Account Button */}
            <button type="button" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-2 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2 cursor-pointer" onClick={() => Navigate('/hospital-provider/account-created')}>
              Create Account <span className="ml-2">→</span>
            </button>
            {/* Pagination dots */}
            <div className="flex justify-center items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
            </div>
          </form>
        </div>
      </div>
      <div className="block md:hidden my-4">
        <ProviderAccount className="mx-auto justify-center" />
      </div>
    </div>
  );
};

export default HospitalDocuments;
