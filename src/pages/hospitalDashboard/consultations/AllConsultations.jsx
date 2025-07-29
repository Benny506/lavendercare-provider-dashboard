import React from 'react';
import DateRangePicker from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { Download } from "lucide-react";
import ConsultationInfoModal from '@/components/ConsultationInfoModal';

const doctors = [
  { date: "07-July", mothersName: "Sarah Adebayo", assignedDoctor: "Dr. Tolu Adebayo", careType: "Medical Consultation", status: "Upcoming" },
  { date: "06-July", mothersName: "Chinenye Okeke",  assignedDoctor: "Dr. Grace Bello",  careType: "Follow-up",               status: "Ongoing" },
  { date: "05-July", mothersName: "Ngozi Umeh",     assignedDoctor: "Dr. Emeka Obi",   careType: "Check-up",                status: "Attended" },
  { date: "04-July", mothersName: "Aisha Musa",     assignedDoctor: "Dr. Funke Ade",   careType: "Consultation",            status: "Canceled" },
  { date: "03-July", mothersName: "Uche Nnaji",      assignedDoctor: "Dr. Peter Eze",   careType: "Medical Consultation",    status: "Missed" },
];

const STATUS_STYLES = {
  Upcoming: { bg: 'bg-[#FFF0E6]',     text: 'text-[#B54C00]'},
  Ongoing:  { bg: 'bg-[#F0F5EA]',   text: 'text-[#5D9126]' },
  Attended: { bg: 'bg-blue-100',    text: 'text-blue-400'  },
  Canceled: { bg: 'bg-yellow-100',  text: 'text-yellow-400'},
  Missed:   { bg: 'bg-gray-100',    text: 'text-gray-400'  },
};

function getStatusBadge(status) {
  const { bg, text } = STATUS_STYLES[status] || STATUS_STYLES.Missed;
  return (
    <p className={`${bg} rounded-2xl px-3 ${text} w-max`}>
      {status}
    </p>
  );
}

const AllConsultations = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DateRangePicker />
        <Button className="flex items-center gap-2 px-4 py-2 bg-white border-gray-400 text-black rounded-md focus:outline-none">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export</span>
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold">All Consultations</h2>
            <p className="text-gray-500">See all your upcoming sessions below</p>
          </div>
          <div className="flex space-x-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Icon icon="iconamoon:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none"
              />
            </div>
            <Select>
              <SelectTrigger className="w-32 py-2 rounded-lg border border-gray-300">
                <SelectValue placeholder="Filter by: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="attended">Attended</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr_0.5fr] font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
          <p>Date</p>
          <p>Mother’s Name</p>
          <p>Assigned Doctor</p>
          <p>Care Type</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {doctors.length > 0 ? (
        doctors.map((doc, idx) => (
          <div key={idx} className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr_0.5fr] items-center gap-5 py-4 border-b text-sm pl-5">
            <p className="font-medium">{doc.date}</p>
            <p>{doc.mothersName}</p>
            <p className="font-semibold">{doc.assignedDoctor}</p>
            <p>{doc.careType}</p>
            {getStatusBadge(doc.status)}
            <div>
              <Button className="bg-primary-600 rounded-3xl px-3 py-1 text-white">View</Button>
            </div>
          </div>
        ) )
      ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                    <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
                    <p className="font-bold text-lg text-center">No data to display</p>
                    <p className="text-sm text-center">Recent appointments will appear here</p>
                  </div>
                )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <button className="flex items-center text-gray-600 hover:text-gray-800 font-bold">
            <Icon icon="mdi:arrow-left" className="mr-2" /> Previous
          </button>
          <div className="flex space-x-2">
            {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-full ${p === 1 ? "bg-primary-100 text-primary-600" : "text-gray-600"} flex items-center justify-center`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center text-gray-600 hover:text-gray-800 font-bold">
            Next <Icon icon="mdi:arrow-right" className="ml-2" />
          </button>
        </div>
      </div>

      <ConsultationInfoModal />
    </div>
  );
};

export default AllConsultations;
