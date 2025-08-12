import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const FeesSession = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-start justify-center bg-transparent">
      <div className="max-w-[340px] md:max-w-xl bg-white rounded-2xl px-4 md:px-8 py-10 flex flex-col items-center shadow-none">
        <h1 className="text-2xl font-bold mb-1 text-left w-full">Fees & Session</h1>
        <p className="mb-6 text-left text-gray-700 w-full text-sm">
          This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
        </p>
        <form className="w-full flex flex-col gap-4">
          {/* Consultation Fee */}
          <div>
            <div className="font-semibold mb-1">Consultation Fee</div>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="$ 1,000.00" className="border border-gray-300 rounded-l px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
              <select className="border border-gray-300 rounded-r px-3 py-2 text-base bg-white focus:outline-none" defaultValue="USD" disabled>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          {/* Consultation Duration */}
          <div>
            <div className="font-semibold mb-1">Consultation Duration</div>
            <div className="flex flex-col gap-2 mt-1">
              {['15 mins', '30 mins', '45 mins', '60 mins'].map((item) => (
                <label key={item} className="flex items-center gap-2 select-none">
                  <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" disabled />
                  <span className="text-base">{item}</span>
                </label>
              ))}
              <div className="text-xs text-gray-500 mt-1 mb-2">Others</div>
            </div>
          </div>
          {/* Consultation Mode */}
          <div>
            <div className="font-semibold mb-1">Consultation Mode (Multi-select)</div>
            <div className="flex flex-col gap-2 mt-1">
              {['Video', 'Phone', 'In-Person'].map((item) => (
                <label key={item} className="flex items-center gap-2 select-none">
                  <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" disabled />
                  <span className="text-base">{item}</span>
                </label>
              ))}
              <div className="text-xs text-gray-500 mt-1 mb-2">Others</div>
            </div>
          </div>
          {/* Cancellation Window */}
          <div>
            <div className="font-semibold mb-1">Cancellation Window</div>
            <div className="flex flex-col gap-2 mt-1">
              {['12 hours', '24 hours', '48 hours'].map((item) => (
                <label key={item} className="flex items-center gap-2 select-none">
                  <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" disabled />
                  <span className="text-base">{item}</span>
                </label>
              ))}
              <div className="text-xs text-gray-500 mt-1 mb-2">Others</div>
            </div>
          </div>
          {/* Next Button */}
          <button onClick={() => navigate('/individual/account-created')} type="button" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2">
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

export default FeesSession;
