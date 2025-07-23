import { Button } from '@/components/ui/button';
import React from 'react';

const recentConsultations = [
  {
    date: '07-July',
    mother: 'Sarah Adebayo',
    doctor: 'Dr. Tolu Adebayo',
    careType: 'Medical Consultation',
    status: 'Upcoming',
  },
  {
    date: '06-July',
    mother: 'Chinenye Okeke',
    doctor: 'Dr. Grace Bello',
    careType: 'Mental Health Support',
    status: 'Ongoing',
  },
  {
    date: '05-July',
    mother: 'Fatima Musa',
    doctor: 'Nurse Lillian Johnson',
    careType: 'Physical Recovery',
    status: 'Attended',
  },
];

const statusColors = {
  Upcoming: 'bg-orange-100 text-orange-500',
  Ongoing: 'bg-green-100 text-green-600',
  Attended: 'bg-purple-100 text-purple-600',
};

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Divider */}
      <hr className="bg-[#D2C3EF] h-1 rounded-full w-full border-none mb-6 mt-3" />

      {/* Header Buttons */}
      <div className="flex gap-4 justify-end mb-6">
        <Button className="rounded-3xl px-6 py-6 bg-white text-black font-extrabold">View Request</Button>
        <Button className="rounded-3xl px-6 py-6 bg-primary-600 font-extrabold text-white">Add Doctor</Button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="flex gap-4 mb-6">
        {/* Card 1 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Doctors</p>
          <div className="flex items-start gap-4 py-4">
            <hr className="bg-black h-1.5 w-4 mt-2 border-none" />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <p className="text-lg text-primary-600 font-extrabold mt-3">View all Doctors</p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Consultations</p>
          <div className="flex items-start gap-4 py-4">
            <hr className="bg-black h-1.5 w-4 mt-2 border-none" />
            <div className="flex items-end">
              <p className="bg-lime-200 rounded-full px-2 text-sm">+5</p>
              <p className="ml-2 text-sm">vs last month</p>
            </div>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <p className="text-lg text-primary-600 font-extrabold mt-3">View Active</p>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Caseload</p>
          <div className="flex items-start gap-4 py-4">
            <hr className="bg-black h-1.5 w-4 mt-2 border-none" />
            <div className="flex items-end">
              <p className="bg-red-200 rounded-full px-2 text-sm">+5</p>
              <p className="ml-2 text-sm">vs last month</p>
            </div>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <p className="text-lg text-primary-600 font-extrabold mt-3">See Inactives</p>
        </div>
      </div>

      {/* Second Row Cards */}
      <div className="flex gap-4 mb-6">
        {/* Card 4 */}
        <div className="flex-1 bg-primary-600 text-white rounded-xl p-6">
          <p className="text-md font-medium">Unassigned Caseload</p>
          <div className="flex items-start gap-4 py-4">
            <hr className="bg-white h-1.5 w-4 mt-2 border-none" />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <p className="text-lg font-extrabold mt-3">View Cases</p>
        </div>

        {/* Card 5 */}
        <div className="flex-1 bg-primary-500 text-white rounded-xl p-6">
          <p className="text-md font-medium">Caseload Requiring Approval</p>
          <div className="flex items-start gap-4 py-4">
            <hr className="bg-white h-1.5 w-4 mt-2 border-none" />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <p className="text-lg font-extrabold mt-3">Review Schedule</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="w-full bg-white rounded-xl py-6 px-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-lg font-bold text-black">Recent Activity</p>
            <p className="text-sm text-gray-600">See your most recent consultation below</p>
          </div>
          <p className="text-primary-600 font-semibold cursor-pointer hover:underline">
            View all Consultation →
          </p>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-6 font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
          <p>Date</p>
          <p>Mother’s name</p>
          <p>Assigned Doctor</p>
          <p>Care Type</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {/* Table Rows */}
        {recentConsultations.length > 0 ? (
          recentConsultations.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 py-4 text-sm border-b items-center gap-5 pl-5"
            >
              <p>{item.date}</p>
              <p>{item.mother}</p>
              <p>{item.doctor}</p>
              <p>{item.careType}</p>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-primary-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 19h14M5 15h14" />
            </svg>
            <p className="font-bold text-lg">No data to display</p>
            <p className="text-sm">Recent appointments will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
