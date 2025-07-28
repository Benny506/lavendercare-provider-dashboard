import DateRangePicker from '@/components/DateRangePicker';
import TopDivider from '@/components/TopDivider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { Download } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import ViewCase from './ViewCase';
import AssignDoctor from './AssignDoctor';

const allCaseload = [
    {
        mother: "Sarah Adebayo",
        doctor: "",
        careType: "Medical",
        lastConsultDate: "2025‑07‑06",
        status: "New"
    },
    {
        mother: "Chineye Okeke",
        doctor: "Dr. Emeka Obi",
        careType: "Mental",
        lastConsultDate: "2025‑07‑05",
        status: "New"
    },
    {
        mother: "Sarah Adebayo",
        doctor: "Nurse Lillian James",
        careType: "Physical",
        lastConsultDate: "2025‑07‑04",
        status: "Closed"
    },
    {
        mother: "Sarah Adebayo",
        doctor: "Doula Funke Adeyemi",
        careType: "Medical",
        lastConsultDate: "2025‑07‑03",
        status: "Ongoing"
    },
    {
        mother: "Sarah Adebayo",
        doctor: "Dr Emeka Obi",
        careType: "Mental",
        lastConsultDate: "2025‑07‑02",
        status: "New"
    },
]

const STATUS_STYLES = {
    New: { bg: 'bg-[#F0F5EA]', text: 'text-[#669F2A]' },
    Closed: { bg: 'bg-[#FCE8E7]', text: 'text-[#E41C11]' },
    Ongoing: { bg: 'bg-[#FFF0E6]', text: 'text-[#B54C00]' }
};

function getStatusBadge(status) {
    const { bg, text } = STATUS_STYLES[status] || STATUS_STYLES.New;
    return (
        <p className={`${bg} rounded-2xl px-3 py-1 ${text} text-sm font-medium w-max`}>
            {status}
        </p>
    );
}

const AllCaseload = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCareType, setSelectedCareType] = useState("All");
    return (
        <div>
            <TopDivider />

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
                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="w-32 py-2 rounded-lg border border-gray-300 text-sm"
                            >
                                Filter by: All
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
                                    <h4 className="font-semibold mb-2">Filter</h4>

                                    {/* Assigned Doctor Dropdown (Static for now) */}
                                    <label className="block text-sm text-gray-600 mb-1">Assigned Doctor</label>
                                    <Select>
                                        <SelectTrigger className="w-full mb-4 py-2 rounded-md border border-gray-300">
                                            <SelectValue placeholder="Select Doctor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dr. Emeka Obi">Dr. Emeka Obi</SelectItem>
                                            <SelectItem value="Nurse Lillian James">Nurse Lillian James</SelectItem>
                                            <SelectItem value="Doula Funke Adeyemi">Doula Funke Adeyemi</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Care Type Pills */}
                                    <label className="block text-sm text-gray-600 mb-2">Care Type</label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {["All", "Mental", "Medical", "Physical"].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedCareType(type)}
                                                className={`px-3 py-1 rounded-full border text-sm ${selectedCareType === type
                                                        ? "bg-primary-600 text-white"
                                                        : "border-gray-400 text-gray-700"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>

                                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm">
                                        Apply
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Table Headers */}
                <div className="grid grid-cols-[2fr_2fr_2.5fr_2.5fr_2fr_2fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p>Mother's Name</p>
                    <p>Assigned Doctor</p>
                    <p>Care Type</p>
                    <p>Last Consult Date</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>

                {/* Table Rows */}
                {allCaseload.length > 0 ? (
                    allCaseload.map((caseItem, idx) => (
                        <div key={idx} className="grid grid-cols-[2fr_2fr_2.5fr_2.5fr_2fr_2fr] items-center gap-5 py-4 border-b text-sm pl-5">
                            <p className="font-medium">{caseItem.mother}</p>
                            <p>{caseItem.doctor}</p>
                            <p className="font-semibold">{caseItem.careType}</p>
                            <p>{caseItem.lastConsultDate}</p>
                            {getStatusBadge(caseItem.status)}
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



            {/* <ViewCase/> */}
            <AssignDoctor />

        </div>
    )
}

export default AllCaseload