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
import { useEffect, useState } from "react";
import PatientModal from "./PatientModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsState, setUserDetails } from "@/redux/slices/userDetailsSlice";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { toast } from "react-toastify";
import supabase from "@/database/dbInit";
import { MENTAL_HEALTH_TEST_TYPES } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getRiskLevelBadge } from "@/lib/utilsJsx";
import ZeroItems from "@/components/ui/ZeroItems";


const AllScreening = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const screenings = useSelector(state => getUserDetailsState(state).screenings)
    const bookings = useSelector(state => getUserDetailsState(state).bookings)

    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedType, setSelectedType] = useState("All");
    // const [apiReqs, setApiReqs] = useState({ isLoading: true, errorMsg: null })

    const resetFilters = () => {
        setSelectedType("All")
        setSearchTerm("")
        setShowFilter(false)
    }

    const filteredData = screenings.filter(item => {

        const { user_profile, test_type } = item

        const matchesSearch = user_profile?.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedType === "All" || test_type === selectedType;
        return matchesSearch && matchesFilter;
    });

    const handleViewDetails = (item) => {
        navigate('/individual/dashboard/screenings/case-report', { state: { patient_id: item?.user_profile?.id } })
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
                                    <span>Filter by: {selectedType}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showFilter && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
                                        <h4 className="font-semibold mb-2">Filter</h4>

                                        {/* Screening Type Pills */}
                                        <label className="block text-sm text-gray-600 mb-2">Screening Type</label>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {["All", ...MENTAL_HEALTH_TEST_TYPES].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => {
                                                        setSelectedType(type)
                                                        setShowFilter(false)
                                                    }}
                                                    className={`px-3 py-1 rounded-full border text-sm ${selectedType === type
                                                        ? "bg-purple-600 text-white border-purple-600"
                                                        : "border-gray-400 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>

                                        {/* <Button
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
                                            onClick={() => setShowFilter(false)}
                                        >
                                            Apply
                                        </Button> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Submission Date</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Client Name</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Type</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Score</th>
                                    {/* <th className="text-center py-4 text-sm font-semibold text-gray-700">Interpretation</th> */}
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Risk Level</th>
                                    <th className="text-center py-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredData.map((item, index) => {

                                        const { 
                                            user_profile, risk_level, test_date, score,
                                            test_type,
                                        } = item
                                        
                                        const { 
                                            name,
                                        } = user_profile

                                        const submissionDate = new Date(test_date).toDateString()

                                        return (
                                            <tr key={index} className="border-b">
                                                <td className="text-center py-6 text-gray-900">
                                                    {submissionDate}
                                                </td>
                                                <td className="text-center py-6 font-medium text-gray-900">
                                                    {name}
                                                </td>
                                                <td className="text-center py-6 text-gray-700 font-semibold">
                                                    {test_type}
                                                </td>
                                                <td className="text-center py-6 text-gray-900 font-semibold">
                                                    {score}
                                                </td>
                                                {/* <td className="text-center py-6">
                                                    {getInterpretationBadge(item.interpretation)}
                                                </td> */}
                                                <td className="text-center py-6">
                                                    {getRiskLevelBadge(risk_level)}
                                                </td>
                                                <td className="text-center py-6">
                                                    <Button className="cursor-pointer bg-primary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold" onClick={() => handleViewDetails(item)}>
                                                        View Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        )})
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Empty state if no data */}
                    {((filteredData.length === 0) || !filteredData) && (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
                            <p className="font-bold text-lg text-center">No screening data found</p>
                            <p className="text-sm text-center">Recent screening results will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllScreening;