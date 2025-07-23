import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Divider */}
      <hr className="bg-[#D2C3EF] h-1 rounded-full w-full border-none mb-6 mt-3" />

      {/* Notification Banner */}
      <div className="flex justify-between px-6 bg-[#FCE4E2] border-[#E74C3C] border w-full rounded-[2px] mb-4 -mt-2 text-sm items-center">
        <div className='flex items-start gap-6 '>
          <Icon icon="mdi:shield-warning-outline" width="14" height="14" style={{ color: "red" }} className='my-0.5' />
          <p className='-ml-4 text-[13px]'>5 doctors need schedule approval</p>
        </div>

        <Icon icon="iconoir:cancel" width="24" height="24" style={{ color: "#E74C3C" }} className='cursor-pointer' />
      </div>

      {/* Header Buttons */}
      <div className="flex gap-4 justify-end mb-6">
        <Button className="rounded-3xl px-6 py-6 bg-white text-black font-extrabold cursor-pointer">View Request</Button>
        <Button className="rounded-3xl px-6 py-6 bg-primary-600 font-extrabold text-white cursor-pointer" onClick={() => Navigate('/hospital/dashboard/add-doctor')} >Add Doctor</Button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="flex gap-4 mb-6">
        {/* Card 1 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Doctors</p>
          <div className="flex items-start gap-4 py-4">
            <p className="text-2xl font-bold">12</p>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all Doctors</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5  text-xl" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Consultations</p>
          <div className="flex items-start gap-4 py-4">
            <p className="text-2xl font-bold">24</p>
            <div className="flex items-end mt-1">
              <p className="bg-[#D6F0E1] rounded-full px-2 text-sm text-[#007733]">+5</p>
              <p className="ml-2 text-sm">vs last month</p>
            </div>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View Active</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5  text-xl" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Caseload</p>
          <div className="flex items-start gap-4 py-4">
            <p className="text-2xl font-bold">26</p>
            <div className="flex items-end mt-1">
              <p className="bg-[#F7B9B5] rounded-full px-2 text-sm text-[#A2140C]">+5</p>
              <p className="ml-2 text-sm">vs last month</p>
            </div>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">See Inactives</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5  text-xl" />
          </div>
        </div>
      </div>

      {/* Second Row Cards */}
      <div className="flex gap-4 mb-6">
        {/* Card 4 */}
        <div className="flex-1 bg-primary-600 text-white rounded-xl p-6">
          <p className="text-md font-medium">Unassigned Caseload</p>
          <div className="flex items-start gap-4 py-4">
            <p className="font-bold text-3xl">4</p>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2'>
            <p className="text-lg font-extrabold mt-3 cursor-pointer">View Cases</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5  text-xl" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="flex-1 bg-primary-600 text-white rounded-xl p-6">
          <p className="text-md font-medium">Caseload Requiring Approval</p>
          <div className="flex items-start gap-4 py-4">
            <p className="font-bold text-3xl">5</p>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2'>
            <p className="text-lg font-extrabold mt-3 cursor-pointer">Review Schedules</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5  text-xl" />
          </div>
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
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
            <p className="font-bold text-lg text-center">No data to display</p>
            <p className="text-sm text-center">Recent appointments will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
