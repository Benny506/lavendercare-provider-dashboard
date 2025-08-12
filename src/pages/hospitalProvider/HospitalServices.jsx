import React from "react";
import { Icon } from "@iconify/react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProviderAccount from "@/components/ProviderAccount";

const HospitalServices = () => {
  const Navigate = useNavigate();
  return (
    <div className="-mt-15">
      <div className="hidden md:block absolute top-8 right-10">
        <ProviderAccount />
      </div>
      <div className="min-h-screen flex items-center justify-center mt-16 md:mt-26">
        <div className="max-w-[340px] md:max-w-lg bg-white rounded-2xl px-4 md:px-8 py-10 flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold mb-1 text-left w-full">Specialties & Services</h1>
          <p className="mb-4 text-left text-gray-700 w-full text-sm">
            This step defines what types of care the hospital provides and improves how mothers are matched with the right facility.
          </p>
          <form className="w-full flex flex-col gap-">
            {/* Specialties */}
            <div>
              <div className="font-semibold mb-2">Specialties</div>
              {[
                "Obstetrics",
                "Gynecology",
                "Postnatal Recovery",
                "Neonatal Care",
                "Maternal Mental Health",
                "Pelvic Health",
                "Family Planning",
                "Fertility Support",
                "Lactation Counselling",
              ].map((item) => (
                <label className="flex items-center gap-2 mb-5 cursor-pointer select-none">
                  <input type="checkbox" className="peer hidden" />
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 border rounded-[6px] bg-white shadow-[2px_2px_4px_rgba(0,0,0,1)] border-[#000000] mt-0.5"
                    style={{ minWidth: 20, borderWidth: '1px' }}
                  ></span>
                  <span className="text-base">{item}</span>
                </label>

              ))}
              <div className="text-md text-gray-500 my-4 font-medium">Others</div>
            </div>
            {/* Services */}
            <div>
              <div className="font-semibold mb-4">Available Services</div>
              {[
                "In-Person Consultations",
                "Virtual Consultations",
                "24/7 Emergency Maternal Support",
                "Ultrasound & Imaging",
                "Delivery Room Facilities",
                "Mental Health Screening",
                "Physical Therapy (Postpartum)",
                "Nutrition & Diet Support",
                "Support Groups (On-site or Virtual)",
              ].map((item) => (
                <label className="flex items-center gap-2 mb-5 cursor-pointer select-none">
                  <input type="checkbox" className="peer hidden" />
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 border rounded-[6px] bg-white shadow-[2px_2px_4px_rgba(0,0,0,1)] border-[#000000] mt-0.5"
                    style={{ minWidth: 20, borderWidth: '1px' }}
                  ></span>
                  <span className="text-base">{item}</span>
                </label>


              ))}
              <div className="text-md text-gray-500 my-4 font-medium">Others</div>
            </div>
            {/* Operating Hours */}
            <div className="space-y-4">
              {/* Header */}
              <div className="font-semibold text-lg">Operating Hours</div>

              {/* Days row */}
              <div className="flex flex-col items-start gap-2">
                <label className="text-sm">Days</label>
                <div className="flex items-center gap-2 w-full relative">
                  <input
                    type="text"
                    placeholder="Monday - Sunday"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    readOnly
                  />
                  <Switch id="toggle-days" className={"absolute right-3"} />
                </div>
              </div>

              {/* Time row */}
              <div className="flex w-full mb-2">
                <div className="flex flex-wrap gap-2 w-full">
                  <div className="flex flex-col items-start gap-1 flex-1 min-w-[140px]">
                    <label className="text-sm">Days</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      readOnly
                    />
                  </div>
                  <span className="bg-gray-400 h-1 w-5 rounded-2xl self-end mb-3 flex-shrink-0"></span>
                  <div className="flex flex-col items-start gap-1 flex-1 min-w-[140px]">
                    <label className="text-sm">End Time</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      readOnly
                    />
                  </div>
                </div>
              </div>


            </div>

            {/* Next Button */}
            <Button type="button" className="bg-primary-600 text-white rounded-full py-6 font-semibold text-md mt-4 mx-4 flex items-center justify-center cursor-pointer" onClick={() => Navigate('/hospital-provider/hospital-documents')}>
              Next
              <span className="ml-2">→</span>
            </Button>
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
export default HospitalServices;
