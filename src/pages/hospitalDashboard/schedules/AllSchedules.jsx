import TopDivider from "@/components/TopDivider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icon } from "@iconify/react"
import React from "react";
import ApproveDoctorModal from "./ApproveScheduleModal";
import RejectScheduleModal from "./RejectScheduleModal";

const doctors = [
    {
        doctorName: "Dr. Grace Bello",
        specialty: "OB-GYN",
        requestedSlots: "Mon 9–12 am; Wed 2–5 pm",
        submittedOn: "2025-07-05",
        status: "Pending"
    },
    {
        doctorName: "Dr. Emeka Obi",
        specialty: "Mental Health",
        requestedSlots: "Tue 10–1 pm",
        submittedOn: "2025-07-06",
        status: "Approved"
    },
    {
        doctorName: "Nurse Lillian James",
        specialty: "Physical Recovery",
        requestedSlots: "Fri 8–11 am",
        submittedOn: "2025-07-04",
        status: "Rejected"
    },
    {
        doctorName: "Doula Funke Adeyemi",
        specialty: "Birth Support",
        requestedSlots: "Thu 1–4 pm",
        submittedOn: "2025-07-07",
        status: "Pending"
    },
    {
        doctorName: "Dr. Emeka Obi",
        specialty: "Mental Health",
        requestedSlots: "Wed 10–1 pm",
        submittedOn: "2025-07-06",
        status: "Approved"
    }
];


const STATUS_STYLES = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    Approved: { bg: 'bg-green-100', text: 'text-green-600' },
    Rejected: { bg: 'bg-red-100', text: 'text-red-500' }
};


function getStatusBadge(status) {
    const { bg, text } = STATUS_STYLES[status] || STATUS_STYLES.Pending;
    return (
        <p className={`${bg} rounded-2xl px-3 py-1 ${text} text-sm font-medium w-max`}>
            {status}
        </p>
    );
}

function getActionButtons(status) {
    switch (status) {
        case "Pending":
            return (
                <div className="flex gap-2 items-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm rounded">Approve</Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-sm rounded">Reject</Button>
                </div>
            );
        case "Approved":
            return (
                <div className="flex gap-2 items-center">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 text-sm rounded">Revoke</Button>
                    <Icon icon="mdi:pencil" className="text-purple-600 w-4 h-4 cursor-pointer" />
                    <Icon icon="mdi:eye-outline" className="text-gray-500 w-4 h-4 cursor-pointer" />
                </div>
            );
        case "Rejected":
            return (
                <div className="flex gap-2 items-center">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1 text-sm rounded">Resubmit</Button>
                    <Icon icon="mdi:eye-outline" className="text-gray-500 w-4 h-4 cursor-pointer" />
                </div>
            );
        default:
            return null;
    }
}



const AllSchedules = () => {
    return (
        <div>
            <TopDivider />

            <div className="border-b border-gray-400 w-full flex gap-4 items-center justify-start mb-6">
                <div className="flex flex-col bg-gray-100 w-max items-end justify-end">
                    <p className="text-primary-600 font-bold px-5 py-3">ALL</p>
                    <div className="bg-primary-600 h-1 w-full"></div>
                </div>
                <p className="text-gray-400 font-bold">Pending</p>
                <p className="text-gray-400 font-bold">Approved</p>
                <p className="text-gray-400 font-bold">Rejected</p>
            </div>


            <div className="rounded-lg bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 border-b pb-4">
                    <div>
                        <h2 className="text-2xl font-bold">All Schedules</h2>
                        <p className="text-gray-500">See all your Schedules below</p>
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
                <div className="grid grid-cols-[2fr_2fr_2.5fr_2.5fr_2fr_2fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p>Doctor Name</p>
                    <p>Specialty</p>
                    <p>Requested Slots</p>
                    <p>Submitted On</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>

                {/* Table Rows */}
                {doctors.length > 0 ? (
                    doctors.map((doc, idx) => (
                        <div key={idx} className="grid grid-cols-[2fr_2fr_2.5fr_2.5fr_2fr_2fr] items-center gap-5 py-4 border-b text-sm pl-5">
                            <p className="font-medium">{doc.doctorName}</p>
                            <p>{doc.specialty}</p>
                            <p className="font-semibold">{doc.requestedSlots}</p>
                            <p>{doc.submittedOn}</p>
                            {getStatusBadge(doc.status)}
                            <div className="flex items-center justify-start">
                                {getActionButtons(doc.status)}
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

            <ApproveDoctorModal /> /*Approve Modal */

            <RejectScheduleModal />

        </div>
    )
}

export default AllSchedules