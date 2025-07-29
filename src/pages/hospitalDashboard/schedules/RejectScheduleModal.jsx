import React from "react";
import { Icon } from "@iconify/react";

const RejectScheduleModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close Icon */}
        <div className="absolute top-4 right-4 text-xl cursor-pointer">
          <Icon icon="iconoir:cancel" width="24" height="24" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold mb-1">Reject Schedule</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to reject this schedule?
        </p>

        {/* Input Label */}
        <label htmlFor="reason" className="block font-medium mb-2 text-sm">
          Give Reason
        </label>

        {/* Underlined Text Input */}
        <input
          id="reason"
          type="text"
          placeholder=""
          className="w-full border-b border-gray-300 text-sm focus:outline-none focus:border-black pb-1 mb-6"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button className="border border-gray-300 text-black font-semibold rounded-md px-5 py-2 text-sm">
            Cancel
          </button>
          <button className="bg-red-600 text-white font-semibold rounded-md px-5 py-2 text-sm">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectScheduleModal;
