import TopDivider from "@/components/TopDivider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { Download } from "lucide-react";
import { useState } from "react";

// Dummy caseload data
const caseloadData = [
    {
        motherName: "Chinenye Okeke",
        firstConsult: "May 1, 2025",
        lastConsult: "July 12, 2025",
        careType: "Medical Consultation",
        status: "New"
    },
    {
        motherName: "Aisha Bello",
        firstConsult: "June 15, 2025",
        lastConsult: "August 20, 2025",
        careType: "Physical Recovery",
        status: "New"
    },
    {
        motherName: "Ngozi Eze",
        firstConsult: "July 2, 2025",
        lastConsult: "September 5, 2025",
        careType: "Mental Wellness",
        status: "Closed"
    },
    {
        motherName: "Ngozi Eze",
        firstConsult: "August 10, 2025",
        lastConsult: "October 15, 2025",
        careType: "Physical Recovery",
        status: "Ongoing"
    },
    {
        motherName: "Fatima Musa",
        firstConsult: "Sept 1, 2025",
        lastConsult: "Nov 10, 2025",
        careType: "Mental Wellness",
        status: "Closed"
    },
];

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

const Caseload = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCareType, setSelectedCareType] = useState("All");

    const filteredData = caseloadData.filter(item => {
        const matchesSearch = item.motherName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedCareType === "All" || item.careType.includes(selectedCareType);
        return matchesSearch && matchesFilter;
    });

    return (
        <div>

            <TopDivider />

            {/* Top section with date range and export */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2 md:gap-4">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl border">
                        <span className="text-gray-700 font-medium">Status</span>
                        <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl border">
                        <span className="text-gray-700 font-medium">Care Type</span>
                        <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl border">
                        <span className="text-gray-700 font-medium">Date Range</span>
                        <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>


            {/* Main content card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 border-b pb-4">
                    {/* Title */}
                    <div className="flex-shrink-0">
                        <h2 className="text-2xl font-bold">All Caseload</h2>
                        <p className="text-gray-500">See all your Caseload below</p>
                    </div>

                    {/* Search + Filter */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Icon
                                icon="iconamoon:search"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search client or date"
                                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative flex-shrink-0">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="w-full sm:w-32 py-2 rounded-lg border border-gray-300 text-sm"
                            >
                                Filter by: All
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
                                    <h4 className="font-semibold mb-2">Filter</h4>

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

                                    <Button
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm"
                                        onClick={() => setShowFilter(false)}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table Headers */}
                <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p>Mother's Name</p>
                    <p>First/Last Consult</p>
                    <p>Care Type</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                {/* Table Rows */}
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div
                            key={index}
                            className="md:grid md:grid-cols-[2fr_2fr_1.5fr_1fr_1fr] md:items-center gap-5 py-4 border-b text-sm pl-5 flex flex-col"
                        >
                            {/* Mother's Name */}
                            <p className="font-medium text-gray-900">
                                <span className="md:hidden font-semibold text-gray-600">Mother's Name: </span>
                                {item.motherName}
                            </p>

                            {/* First/Last Consult */}
                            <p className="text-gray-700">
                                <span className="md:hidden font-semibold text-gray-600">First/Last Consult: </span>
                                {item.firstConsult} / {item.lastConsult}
                            </p>

                            {/* Care Type */}
                            <p className="text-gray-700 font-semibold">
                                <span className="md:hidden font-semibold text-gray-600">Care Type: </span>
                                {item.careType}
                            </p>

                            {/* Status */}
                            <div>
                                <span className="md:hidden font-semibold text-gray-600">Status: </span>
                                {getStatusBadge(item.status)}
                            </div>

                            {/* Actions */}
                            <div>
                                <span className="md:hidden font-semibold text-gray-600">Actions: </span>
                                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer">
                                    View Case
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
                        <p className="font-bold text-lg text-center">No data to display</p>
                        <p className="text-sm text-center">Recent caseload will appear here</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    {/* Previous Button */}
                    <button className="flex items-center text-gray-600 hover:text-gray-800 font-bold">
                        <Icon icon="mdi:arrow-left" className="mr-2" />
                        <span className="hidden md:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
                            <button
                                key={i}
                                className={`w-8 h-8 rounded-full ${p === 1
                                    ? "bg-primary-100 text-primary-600"
                                    : "text-gray-600"
                                    } flex items-center justify-center`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button className="flex items-center text-gray-600 hover:text-gray-800 font-bold">
                        <span className="hidden md:inline">Next</span>
                        <Icon icon="mdi:arrow-right" className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Caseload;