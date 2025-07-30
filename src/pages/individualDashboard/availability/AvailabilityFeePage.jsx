import React, { useState } from 'react';
import { Check } from 'lucide-react';
import TopDivider from '@/components/TopDivider';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function AvailabilityFeePage() {
  const [availability, setAvailability] = useState({});
  const [success, setSuccess] = useState(false);

  const toggleAvailability = (day, time) => {
    const key = `${day}_${time}`;
    setAvailability(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <TopDivider />
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-10 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-semibold">Availability & Fee</div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-primary-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-3">
            <div className="overflow-x-auto">
              <table className="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="border-b text-md p-2 font-normal text-left w-24">Time</th>
                    {days.map(day => (
                      <th key={day} className="border-b text-md p-2 font-normal text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time}>
                      <td className="border-b p-2 text-sm text-left">{time}</td>
                      {days.map(day => {
                        const key = `${day}_${time}`;
                        const checked = availability[key];
                        return (
                          <td key={key} className="border-b p-2 text-center">
                            <input
                              type="checkbox"
                              checked={!!checked}
                              onChange={() => toggleAvailability(day, time)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex-1 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-base font-bold">Fee</div>
              <button className="text-primary-600 text-sm bg-transparent border-none cursor-pointer p-0">Edit</button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-0">
              <div className="max-w-[700px] p-4">
                <div className="flex items-center gap-2 w-full mb-4">
                  <label className="text-sm mr-2">Session Duration</label>
                </div>
                <div className="flex items-center gap-2 w-full mb-4">
                  <label className="text-sm w-20">15 mins</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                    placeholder="-"
                  />
                  <button className="border border-primary-600 text-primary-600 rounded px-4 py-1 text-sm bg-white ml-2 cursor-pointer">Set</button>
                </div>
                <div className="flex items-center gap-2 w-full mb-4">
                  <label className="text-sm w-20">30 mins</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                    value="$ 20"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2 w-full mb-4">
                  <label className="text-sm w-20">45 mins</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                    value="$ 25"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <label className="text-sm w-20">1 hour</label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                    value="$ 30"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {success && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
              <div className="bg-white w-[400px] p-6 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="text-green-600" size={32} />
                  </div>
                </div>
                <div className="text-lg font-medium mb-1">Success</div>
                <p className="text-sm text-gray-600 mb-5">
                  All changes in your availability has been successful
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-primary-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
