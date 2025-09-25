import TopDivider from "@/components/TopDivider";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Download, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PatientModal from "./PatientModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsState, setUserDetails } from "@/redux/slices/userDetailsSlice";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { toast } from "react-toastify";
import supabase from "@/database/dbInit";
import { getMaxByKey, getPastDate, isDateBetween, isDateInRange, MENTAL_HEALTH_TEST_TYPES, weekFilters } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getRiskLevelBadge } from "@/lib/utilsJsx";
import ZeroItems from "@/components/ui/ZeroItems";
import { useReactToPrint } from "react-to-print";
import { usePagination } from "@/hooks/usePagination";
import useApiReqs from "@/hooks/useApiReqs";



const AllScreening = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
 
    const { loadMoreScreenings } = useApiReqs()

    const screenings = useSelector(state => getUserDetailsState(state).screenings)
    const bookings = useSelector(state => getUserDetailsState(state).bookings)

    const screeningsContainerRef = useRef(null)

    const [currentPage, setCurrentPage] = useState(0)
    const [pageListIndex, setPageListIndex] = useState(0)
    const [canLoadMore, setCanLoadMore] = useState(true)    
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showWeekFilter, setShowWeekFilter] = useState(false)
    const [selectedType, setSelectedType] = useState("All");
    const [selectedWeekFilter, setSelectedWeekFilter] = useState(weekFilters[0])
    // const [apiReqs, setApiReqs] = useState({ isLoading: true, errorMsg: null })

    const resetFilters = () => {
        setSelectedType("All")
        setSearchTerm("")
        setShowFilter(false)
    }

    const exportElementToPdf = useReactToPrint({
        contentRef: screeningsContainerRef
    });

    const filteredData = screenings.filter(item => {

        const { user_profile, test_type, test_date } = item

        const checkDateISO = new Date(test_date).toISOString()

        const matchesSearch = user_profile?.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedType === "All" || test_type === selectedType;
        const datesFilter = selectedWeekFilter.title === 'All' || isDateInRange({ dateToCheck: checkDateISO, range: selectedWeekFilter.keyword })

        return matchesSearch && matchesFilter && datesFilter;
    });

    const handleViewDetails = (item) => {
        navigate('/individual/dashboard/screenings/case-report', { state: { patient_id: item?.user_profile?.id } })
    };

    const handleExportBtnClick = async () => {
        try {
            exportElementToPdf({ ref: screeningsContainerRef.current })

        } catch (error) {
            console.log(error)
            toast.error("Error exporting screenings data")

        }
    }

    const { pageItems, totalPages, pageList, totalPageListIndex } = usePagination({
        arr: filteredData,
        maxShow: 4,
        index: currentPage,
        maxPage: 5,
        pageListIndex
    });

    const incrementPageListIndex = () => {
        if (pageListIndex === totalPageListIndex) {
            setPageListIndex(0)

        } else {
            setPageListIndex(prev => prev + 1)
        }

        return
    }

    const decrementPageListIndex = () => {
        if (pageListIndex == 0) {
            setPageListIndex(totalPageListIndex)

        } else {
            setPageListIndex(prev => prev - 1)
        }

        return
    }

    return (
        <div>
            <TopDivider />
            <div className=" min-h-screen">
                {/* Top section with time filter and export */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <button
                            onClick={() => setShowWeekFilter(prev => !prev)}
                            className="flex cursor-pointer items-center gap-2 bg-white px-4 py-2 rounded-lg border"
                        >
                            <span className="text-gray-700 font-medium">{selectedWeekFilter.title}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {showWeekFilter && (
                            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
                                <h4 className="font-semibold mb-2">Filter</h4>

                                {/* Screening Type Pills */}
                                <label className="block text-sm text-gray-600 mb-2">Past days</label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {weekFilters.map((filter) => (
                                        <button
                                            key={filter.title}
                                            onClick={() => {
                                                setSelectedWeekFilter(filter)
                                                setShowWeekFilter(false)
                                            }}
                                            className={`px-3 py-1 rounded-full border text-sm ${selectedWeekFilter.title === filter.title
                                                ? "bg-purple-600 text-white border-purple-600"
                                                : "border-gray-400 text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {filter.title}
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

                    <Button onClick={handleExportBtnClick} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-md hover:bg-gray-50">
                        <Icon icon="material-symbols:download" className="w-4 h-4" />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>

                {/* Main content card */}
                <div ref={screeningsContainerRef} className="rounded-lg bg-white p-6 shadow-sm">
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
                                    <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
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
                    <div id="all-screenings-table" className="mt-4">
                        <div className="w-full">
                            {/* Table Headers */}
                            <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                                <p className="text-center py-4 font-semibold text-gray-700">Submission Date</p>
                                <p className="text-center py-4 font-semibold text-gray-700">Client Name</p>
                                {/* <p className="text-center py-4 font-semibold text-gray-700">Type</p> */}
                                <p className="text-center py-4 font-semibold text-gray-700">Score</p>
                                {/* <th className="text-center py-4 font-semibold text-gray-700">Interpretation</th> */}
                                <p className="text-center py-4 font-semibold text-gray-700">Risk Level (Score)</p>
                                <p className="text-center py-4 font-semibold text-gray-700">Max Risk % (Answer)</p>
                                {/* <p className="text-center py-4 font-semibold text-gray-700">Actions</p> */}
                            </div>                            
                            {
                                filteredData.map((item, index) => {

                                    const {
                                        user_profile, risk_level, test_date, score,
                                        test_type, answer
                                    } = item

                                    const {
                                        name,
                                    } = user_profile

                                    const max_risk_percent = getMaxByKey({ arr: answer?.filter(ans => ans.alert_level == 'high' || ans?.alert_level == 'severe'), key: 'risk_level' })

                                    const submissionDate = new Date(test_date).toDateString()

                                    return (
                                        <div onClick={() => handleViewDetails(item)} key={index} className="hover:bg-gray-100 cursor-pointer md:grid md:grid-cols-[2fr_2fr_1.5fr_1fr_1fr] md:items-center gap-5 py-4 border-b text-sm pl-5 flex flex-col">
                                            <div className="text-center py-2 text-gray-900">
                                                {submissionDate}
                                            </div>
                                            <div className="text-center py-2 font-medium text-gray-900">
                                                {name}
                                            </div>
                                            {/* <div className="text-center py-6 text-gray-700 font-semibold">
                                                {test_type}
                                            </div> */}
                                            <div className="text-center py-2 text-gray-900 font-semibold">
                                                {score}
                                            </div>
                                            {/* <td className="text-center py-6">
                                                {getInterpretationBadge(item.interpretation)}
                                            </td> */}
                                            <div className="text-center py-2">
                                                {getRiskLevelBadge(risk_level?.toLowerCase())}
                                            </div>
                                            <div className="text-center py-2">
                                                {max_risk_percent?.risk_percent}%
                                            </div>
                                            {/* {
                                                handleViewDetails
                                                &&
                                                <div className="text-center py-6">
                                                    <Button className="cursor-pointer bg-primary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold" onClick={() => handleViewDetails(item)}>
                                                        View Details
                                                    </Button>
                                                </div>
                                            } */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <DisplayAllScreeningsTable filteredData={filteredData} handleViewDetails={handleViewDetails} /> */}

                    {/* Empty state if no data */}
                    {((filteredData.length === 0) || !filteredData) && (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
                            <p className="font-bold text-lg text-center">No screening data found</p>
                            <p className="text-sm text-center">Recent screening results will appear here</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {
                        pageItems.length > 0
                        &&
                        <div className="mt-6 flex items-center justify-between">
                            <button
                                disabled={pageListIndex > 0 ? false : true}
                                onClick={decrementPageListIndex}
                                style={{
                                    opacity: pageListIndex > 0 ? 1 : 0.5
                                }}
                                className="cursor-not-allowed flex items-center text-gray-600 hover:text-gray-800 font-bold"
                            >
                                <Icon icon="mdi:arrow-left" className="mr-2" />
                                <span className="hidden md:inline">Previous</span>
                            </button>

                            <div className="flex flex-wrap justify-center gap-2">
                                {pageList?.map((p, i) => {

                                    const isActivePAge = p - 1 === currentPage

                                    const handlePClick = () => {
                                        if (p === '...') {

                                            if (i == 0) {
                                                decrementPageListIndex()

                                            } else {
                                                incrementPageListIndex()
                                            }

                                            return;
                                        }

                                        setCurrentPage(p - 1)

                                        return;
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={handlePClick}
                                            className={`w-8 h-8 cursor-pointer rounded-full ${isActivePAge ? "bg-primary-100 text-primary-600" : "text-gray-600"} flex items-center justify-center`}
                                        >
                                            {p}
                                        </button>
                                    )
                                }
                                )}
                            </div>
                            <button
                                disabled={pageListIndex < totalPageListIndex ? false : true}
                                onClick={incrementPageListIndex}
                                style={{
                                    opacity: pageListIndex < totalPageListIndex ? 1 : 0.5
                                }}
                                className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 font-bold"
                            >
                                <span className="hidden md:inline">Next</span> <Icon icon="mdi:arrow-right" className="ml-2" />
                            </button>
                        </div>
                    }

                    {
                        canLoadMore
                        &&
                        <div className="w-full flex items-center justify-center my-5">
                            <Button
                                onClick={() => {
                                    loadMoreScreenings({
                                        callBack: ({ canLoadMore }) => {
                                            setCanLoadMore(canLoadMore ? true : false)
                                        }
                                    })
                                }}
                                className={'bg-purple-600 text-white'}
                            >
                                Load more
                            </Button>
                        </div>
                    }                     
                </div>
            </div>
        </div>
    );
};

export default AllScreening;