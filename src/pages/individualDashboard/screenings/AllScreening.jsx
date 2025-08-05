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
import { Download, ChevronDown } from "lucide-react";
import { useState } from "react";
import PatientModal from "./PatientModal";

// Dummy screening data
const screeningData = [
    {
        submissionDate: "Jul 12, 2025",
        clientName: "Ngozi Eze",
        type: "PHQ-9",
        score: "18",
        interpretation: "Moderate Depression",
        riskLevel: "Medium"
    },
    {
        submissionDate: "Jul 11, 2025",
        clientName: "Amaka Obiora",
        type: "EPDS",
        score: "24",
        interpretation: "Severe Depression",
        riskLevel: "High"
    },
    {
        submissionDate: "Jul 10, 2025",
        clientName: "Chinenye Okeke",
        type: "GAD-7",
        score: "10",
        interpretation: "Moderate Anxiety",
        riskLevel: "Medium"
    },
];

const INTERPRETATION_STYLES = {
    "Moderate Depression": { bg: 'bg-green-100', text: 'text-green-700' },
    "Severe Depression": { bg: 'bg-red-100', text: 'text-red-700' },
    "Moderate Anxiety": { bg: 'bg-green-100', text: 'text-green-700' }
};

const RISK_LEVEL_STYLES = {
    "Medium": { bg: 'bg-orange-100', text: 'text-orange-700' },
    "High": { bg: 'bg-red-100', text: 'text-red-700' }
};

function getInterpretationBadge(interpretation) {
    const { bg, text } = INTERPRETATION_STYLES[interpretation] || INTERPRETATION_STYLES["Moderate Depression"];
    return (
        <span className={`${bg} ${text} px-3 py-1 rounded-full text-sm font-medium`}>
            {interpretation}
        </span>
    );
}

function getRiskLevelBadge(riskLevel) {
    const { bg, text } = RISK_LEVEL_STYLES[riskLevel] || RISK_LEVEL_STYLES["Medium"];
    return (
        <span className={`${bg} ${text} px-3 py-1 rounded-full text-sm font-medium`}>
            {riskLevel}
        </span>
    );
}


const AllScreening = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedType, setSelectedType] = useState("All");
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [selectedScreening, setSelectedScreening] = useState(null);

    const filteredData = screeningData.filter(item => {
        const matchesSearch = item.clientName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedType === "All" || item.type === selectedType;
        return matchesSearch && matchesFilter;
    });

    const handleViewDetails = (item) => {
        setSelectedScreening(item);
        setShowPatientModal(true);
    };

    return (
        <div>
            <TopDivider />
            <div className=" min-h-screen">
                {/* Top section with time filter and export */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
                        <span className="text-gray-700 font-medium">This Week</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <Button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-md hover:bg-gray-50">
                        <Icon icon="material-symbols:download" className="w-4 h-4" />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>

                {/* Main content card */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
                        <div>
                            <h2 className="text-2xl font-bold">All Screening</h2>
                            <p className="text-gray-500">See all your Screening below</p>
                        </div>
                        <div className="flex space-x-4 w-full sm:w-auto">
                            <div className="relative flex-1">
                                <Icon icon="iconamoon:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by client name"
                                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
                                >
                                    <span>Filter by: All</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showFilter && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
                                        <h4 className="font-semibold mb-2">Filter</h4>

                                        {/* Screening Type Pills */}
                                        <label className="block text-sm text-gray-600 mb-2">Screening Type</label>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {["All", "PHQ-9", "EPDS", "GAD-7"].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setSelectedType(type)}
                                                    className={`px-3 py-1 rounded-full border text-sm ${selectedType === type
                                                        ? "bg-purple-600 text-white border-purple-600"
                                                        : "border-gray-400 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>

                                        <Button
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
                                            onClick={() => setShowFilter(false)}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className=" border-b">
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Submission Date</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Client Name</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Type</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Score</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Interpretation</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Risk Level</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-6 py-6 text-gray-900">
                                            {item.submissionDate}
                                        </td>
                                        <td className="px-6 py-6 font-medium text-gray-900">
                                            {item.clientName}
                                        </td>
                                        <td className="px-6 py-6 text-gray-700 font-semibold">
                                            {item.type}
                                        </td>
                                        <td className="px-6 py-6 text-gray-900 font-semibold">
                                            {item.score}
                                        </td>
                                        <td className="px-6 py-6">
                                            {getInterpretationBadge(item.interpretation)}
                                        </td>
                                        <td className="px-6 py-6">
                                            {getRiskLevelBadge(item.riskLevel)}
                                        </td>
                                        <td className="px-6 py-6">
                                            <Button className="bg-primary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold" onClick={() => handleViewDetails(item)}>
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty state if no data */}
                    {filteredData.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
                            <p className="font-bold text-lg text-center">No screening data found</p>
                            <p className="text-sm text-center">Recent screening results will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            <PatientModal show={showPatientModal} onClose={() => setShowPatientModal(false)} data={selectedScreening} />

        </div>
    );
};

export default AllScreening;