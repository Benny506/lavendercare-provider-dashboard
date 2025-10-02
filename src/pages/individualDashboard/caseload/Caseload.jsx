import TopDivider from "@/components/TopDivider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useApiReqs from "@/hooks/useApiReqs";
import { usePagination } from "@/hooks/usePagination";
import { formatDate1, isDateInRange, weekFilters } from "@/lib/utils";
import { allStatus, getStatusBadge } from "@/lib/utilsJsx";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { Icon } from "@iconify/react";
import { Download } from "lucide-react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Caseload = () => {

    const navigate = useNavigate()

    const bookings = useSelector(state => getUserDetailsState(state).bookings)
    const profile = useSelector(state => getUserDetailsState(state).profile)

    const specialties = profile?.provider_specialties || []

    const { loadMoreBookings } = useApiReqs()

    const filterVisibleRef = useRef(false)

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        statusFilterVisible: false, activeStatusFilter: 'All',
        careTypeFilterVisible: false, activeCareTypeFilter: 'All',
        dateRangeFilterVisible: false, activeDateRangeFilter: weekFilters[0]
        
    });
    const [currentPage, setCurrentPage] = useState(0)
    const [pageListIndex, setPageListIndex] = useState(0)
    const [canLoadMore, setCanLoadMore] = useState(true)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterVisibleRef.current) {
                setFilters(prev => ({
                    ...prev,
                    statusFilterVisible: false,
                    dateRangeFilterVisible: false,
                    careTypeFilterVisible: false
                }))
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);    

    useEffect(() => {
        setCurrentPage(0)
        setPageListIndex(0)
    }, [filters.activeStatusFilter, filters.activeCareTypeFilter, filters.activeDateRangeFilter])

    useEffect(() => {
        filterVisibleRef.current = filters.statusFilterVisible || filters.careTypeFilterVisible || filters.dateRangeFilterVisible
    }, [filters])

    const toggleStatusFilter = () => setFilters(prev => ({ ...prev, statusFilterVisible: !prev.statusFilterVisible, careTypeFilterVisible: false, dateRangeFilterVisible: false }))
    const toggleCareTypeFilter = () => setFilters(prev => ({ ...prev, careTypeFilterVisible: !prev.careTypeFilterVisible, statusFilterVisible: false, dateRangeFilterVisible: false }))
    const toggleDateRangeFilter = () => setFilters(prev => ({ ...prev, dateRangeFilterVisible: !prev.dateRangeFilterVisible, careTypeFilterVisible: false, statusFilterVisible: false }))

    const setStatusFilter = ({ filter }) => setFilters(prev => ({ ...prev, statusFilterVisible: false, activeStatusFilter: filter }))
    const setCareTypeFilter = ({ filter }) => setFilters(prev => ({ ...prev, careTypeFilterVisible: false, activeCareTypeFilter: filter }))
    const setDateRangeFilter = ({ filter }) => setFilters(prev => ({ ...prev, dateRangeFilterVisible: false, activeDateRangeFilter: filter }))

    const filteredData = (bookings || []).filter(item => {

        const { day, hour, duration, status } = item

        const checkDateISO = new Date(day).toISOString()

        const selectedStatusFilter = filters.activeStatusFilter
        const selectedCareTypeFilter = filters.activeCareTypeFilter
        const selectedDateRangeFilter = filters.activeDateRangeFilter

        const matchesSearch = item?.user_profile?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatusFilter === 'All' || status === selectedStatusFilter
        const matchesCareType = selectedCareTypeFilter === "All" || item?.service_type?.includes(selectedCareTypeFilter);
        const matchesDateRange = selectedDateRangeFilter?.title === 'All' || isDateInRange({ dateToCheck: checkDateISO, range: selectedDateRangeFilter?.keyword })
        
        return matchesSearch && matchesCareType && matchesStatus && matchesDateRange;
    });   
    
    const { pageItems, totalPages, pageList, totalPageListIndex } = usePagination({
        arr: filteredData,
        maxShow: 4,
        index: currentPage,
        maxPage: 5,
        pageListIndex
    });

    const incrementPageListIndex = () => {
        if(pageListIndex === totalPageListIndex){
            setPageListIndex(0)
         
        } else{
            setPageListIndex(prev => prev+1)
        }

        return
    }

    const decrementPageListIndex = () => {
        if(pageListIndex == 0){
            setPageListIndex(totalPageListIndex)
        
        } else{
            setPageListIndex(prev => prev-1)
        }

        return
    }
    

    return (
        <div>

            <TopDivider />

            {/* Top section with date range and export */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2 md:gap-4">

                    <div className="relative">
                        <div onClick={toggleStatusFilter} className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl border cursor-pointer">
                            <span className="text-gray-700 font-medium">Status: {filters.activeStatusFilter}</span>
                            <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
                        </div>                        

                        {filters.statusFilterVisible && (
                            <div className="absolute left-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
                                <h4 className="font-semibold mb-2">Filter</h4>

                                <label className="block text-sm text-gray-600 mb-2">Status</label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {[{ type: 'All', title: 'All' }, ...allStatus].map((status) => {

                                        const { title, type } = status

                                        const selectedStatus = filters.activeStatusFilter

                                        return (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setStatusFilter({ filter: type })
                                                    return;
                                                }}
                                                className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${selectedStatus === type
                                                        ? "bg-primary-600 text-white"
                                                        : "border-gray-400 text-gray-700"
                                                    }`}
                                            >
                                                { title }
                                            </button>
                                        )}
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="relative">
                        <div onClick={toggleCareTypeFilter} className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl border cursor-pointer">
                            <span className="text-gray-700 font-medium capitalize">Care Type: {filters.activeCareTypeFilter?.replaceAll("_", " ")}</span>
                            <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
                        </div>                        

                        {filters.careTypeFilterVisible && (
                            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
                                <h4 className="font-semibold mb-2">Filter</h4>

                                <label className="block text-sm text-gray-600 mb-2">Care Type</label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {['All', ...specialties].map((careType) => {

                                        const selectedCareType = filters.activeCareTypeFilter

                                        const title = careType?.replaceAll("_", " ")

                                        return (
                                            <button
                                                key={careType}
                                                onClick={() => {
                                                    setCareTypeFilter({ filter: careType })
                                                    return;
                                                }}
                                                className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${selectedCareType === careType
                                                        ? "bg-primary-600 text-white"
                                                        : "border-gray-400 text-gray-700"
                                                    }`}
                                            >
                                                { title }
                                            </button>
                                        )}
                                    )}
                                </div>
                            </div>
                        )}
                    </div>   

                    <div className="relative">
                        <div onClick={toggleDateRangeFilter} className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl border cursor-pointer">
                            <span className="text-gray-700 font-medium capitalize">Date Range: {filters.activeDateRangeFilter?.title}</span>
                            <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500" />
                        </div>                        

                        {filters.dateRangeFilterVisible && (
                            <div className="absolute left-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
                                <h4 className="font-semibold mb-2">Filter</h4>

                                <label className="block text-sm text-gray-600 mb-2">Date Range</label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {weekFilters.map((wF) => {

                                        const { title, keyword } = wF

                                        const isActive =  filters.activeDateRangeFilter?.keyword === keyword

                                        return (
                                            <button
                                                key={keyword}
                                                onClick={() => {
                                                    setDateRangeFilter({ filter: wF })
                                                    return;
                                                }}
                                                className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${isActive
                                                        ? "bg-primary-600 text-white"
                                                        : "border-gray-400 text-gray-700"
                                                    }`}
                                            >
                                                { title }
                                            </button>
                                        )}
                                    )}
                                </div>
                            </div>
                        )}
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
                    </div>
                </div>

                {/* Table Headers */}
                <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p>Mother's Name</p>
                    <p>Consult date</p>
                    <p>Care Type</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                {/* Table Rows */}
                {pageItems.length > 0 ? (
                    pageItems.map((item, index) => {

                        const { user_profile, service_type, day, status } = item

                        const { name } = user_profile

                        return (
                            <div 
                                key={index} 
                                className="md:grid md:grid-cols-[2fr_2fr_1.5fr_1fr_1fr] md:items-center gap-5 py-4 border-b text-sm pl-5 flex flex-col"
                            >
                                <p className="font-semibold text-gray-600">
                                    { name }
                                </p>
                                <p className="font-semibold text-gray-600">
                                    { formatDate1({ dateISO: new Date(day).toISOString() }) }
                                </p>
                                <p className="font-semibold text-gray-600">
                                    {service_type?.replaceAll("_", " ")}
                                </p>
                                <span className="font-semibold text-gray-600">
                                    {getStatusBadge(status)}
                                </span>
                                <div>
                                    <button 
                                        onClick={() => navigate('/individual/dashboard/caseload/case', { state: { booking_id: item?.id } })}
                                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer"
                                    >
                                        View Case
                                    </button>
                                </div>
                            </div>
                        )}
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <Icon icon="uil:calender" className="w-12 h-12 text-primary-600 mb-4" />
                        <p className="font-bold text-lg text-center">No data to display</p>
                        <p className="text-sm text-center">Recent caseload will appear here</p>
                    </div>
                )}

                {/* Pagination */}
                {
                    pageItems.length > 0
                    &&
                        <div className="mt-6 flex items-center justify-center">
                            {/* <button 
                                disabled={pageListIndex > 0 ? false : true}
                                onClick={decrementPageListIndex} 
                                style={{
                                    opacity: pageListIndex > 0 ? 1 : 0.5
                                }}
                                className="cursor-not-allowed flex items-center text-gray-600 hover:text-gray-800 font-bold"
                            >
                                <Icon icon="mdi:arrow-left" className="mr-2" /> 
                                <span className="hidden md:inline">Previous</span>
                            </button>                         */}

                            <div className="flex flex-wrap justify-center gap-2">
                                {pageList?.map((p, i) => {

                                    const isActivePAge = p-1 === currentPage

                                    const handlePClick = () => {
                                        if (p === '...'){
                                            
                                            if(i == 0){
                                                decrementPageListIndex()
                                            
                                            } else{
                                                incrementPageListIndex()
                                            }

                                            return;
                                        }

                                        setCurrentPage(p-1)

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
                                    )}
                                )}
                            </div>
                            {/* <button 
                                disabled={pageListIndex < totalPageListIndex ? false : true}
                                onClick={incrementPageListIndex} 
                                style={{
                                    opacity: pageListIndex < totalPageListIndex ? 1 : 0.5
                                }}
                                className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 font-bold"
                            >
                                <span className="hidden md:inline">Next</span> <Icon icon="mdi:arrow-right" className="ml-2" />
                            </button>                         */}
                        </div>                    
                }

                {
                    canLoadMore
                    &&
                    <div className="w-full flex items-center justify-center my-5">
                        <Button
                            onClick={() => {
                                loadMoreBookings({
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
    );
};

export default Caseload;