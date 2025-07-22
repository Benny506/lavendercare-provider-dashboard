import React from "react";
import { Icon } from "@iconify/react";

const HospitalServices = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl px-8 py-10 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-1 text-left w-full">Specialties & Services</h1>
        <p className="mb-4 text-left text-gray-700 w-full text-sm">
          This step defines what types of care the hospital provides and improves how mothers are matched with the right facility.
        </p>
        <form className="w-full flex flex-col gap-3">
          {/* Specialties */}
          <div>
            <div className="font-semibold mb-1">Specialties</div>
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
              <label key={item} className="flex items-center gap-2 mb-1 select-none">
                <span className="inline-flex items-center justify-center w-5 h-5 border border-gray-400 rounded bg-white" style={{ minWidth: 20 }}></span>
                <input type="checkbox" className="hidden" />
                <span className="text-base">{item}</span>
              </label>
            ))}
            <div className="text-xs text-gray-500 mt-1 mb-2">Others</div>
          </div>
          {/* Services */}
          <div>
            <div className="font-semibold mb-1">Available Services</div>
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
              <label key={item} className="flex items-center gap-2 mb-1 select-none">
                <span className="inline-flex items-center justify-center w-5 h-5 border border-gray-400 rounded bg-white" style={{ minWidth: 20 }}></span>
                <input type="checkbox" className="hidden" />
                <span className="text-base">{item}</span>
              </label>
            ))}
            <div className="text-xs text-gray-500 mt-1 mb-2">Others</div>
          </div>
          {/* Operating Hours */}
          <div>
            <div className="font-semibold mb-1">Operating Hours</div>
            <div className="flex gap-2 mb-2">
              <input type="text" placeholder="Monday - Sunday" className="border border-gray-300 rounded px-3 py-2 w-full text-sm" readOnly />
              <span className="inline-flex items-center px-2 text-gray-400">
                <Icon icon="ph:calendar" />
              </span>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Start time" className="border border-gray-300 rounded px-3 py-2 w-full text-sm" readOnly />
              <span className="inline-flex items-center px-1 text-gray-400">-</span>
              <input type="text" placeholder="End time" className="border border-gray-300 rounded px-3 py-2 w-full text-sm" readOnly />
            </div>
          </div>
          {/* Next Button */}
          <button type="button" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2">
            Next
            <span className="ml-2">→</span>
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
  );
};
export default HospitalServices;
