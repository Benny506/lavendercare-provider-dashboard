import TopDivider from "@/components/TopDivider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/components/ui/ProfileImg";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatDate1, timeToAMPM_FromHour } from "@/lib/utils";
import { allStatus, getStatusBadge } from "@/lib/utilsJsx";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PatientInfo from "../screenings/auxiliary/PatientInfo";
import useApiReqs from "@/hooks/useApiReqs";
import { usePagination } from "@/hooks/usePagination";

// Modal component
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-img overflow-y-auto h-4/5 rounded-2xl p-4 w-full max-w-md shadow-xl relative">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                    {children}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hidden"
                    >
                        <Icon icon="iconoir:cancel" width="24" height="24" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const LIMIT = 100

const AllConsultation = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const bookings = useSelector(state => getUserDetailsState(state).bookings)

    const { state } = useLocation()

    const { loadMoreBookings } = useApiReqs()

    const [tab, setTab] = useState("All");
    const [modalType, setModalType] = useState(null);
    const [currentConsultation, setCurrentConsultation] = useState(null);
    const [searchFilter, setSearchFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [pageListIndex, setPageListIndex] = useState(0)
    const [canLoadMore, setCanLoadMore] = useState(true)

    useEffect(() => {
        const booking_id = state?.booking_id

        if (booking_id) {
            const filteredBooking = (bookings || []).filter(b => b.id == booking_id)[0]

            if (filteredBooking) {
                setCurrentConsultation(filteredBooking)
            }
        }
    }, [])

    const handleSearchFilterChange = filter => {
        setSearchFilter(filter)
        return;
    }

    const closeModal = () => {
        setCurrentConsultation(null);
    };

    const filteredConsultations = (bookings || []).filter(item => {

        const { status } = item

        const matchesTab = tab == 'All' || status == tab
        const matchesSearch = item?.user_profile?.name?.toLowerCase().includes(searchFilter.toLowerCase());

        return matchesSearch && matchesTab
    });

    const { pageItems, totalPages, pageList, totalPageListIndex } = usePagination({
        arr: filteredConsultations,
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

            {/* Tabs and Button */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex flex-wrap gap-4">
                    {[{ type: 'All', title: 'All' }, ...allStatus].map((c_status) => {

                        const { type, title } = c_status

                        return (
                            <button
                                key={type}
                                className={`capitalize px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${tab === type ? "bg-[#6941C6] text-white" : "text-[#667085]"}`}
                                onClick={() => setTab(type)}
                            >
                                {title}
                            </button>
                        )
                    }
                    )}
                </div>

                {/* <Button className="bg-primary-600 rounded-3xl cursor-pointer">
                    <Icon icon="icon-park-outline:message" style={{ color: "white" }} />
                    New Consultation
                </Button> */}
            </div>

            {/* Main Table Card */}
            <div
                className="rounded-lg lg:max-h-[70vh] lg:overflow-y-auto bg-white p-6 shadow-sm"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 border-b pb-4">
                    <div>
                        <h2 className="text-xl font-bold">Consultations</h2>
                        <p className="text-gray-500">See all your Bookings below</p>
                    </div>
                    <div className="flex space-x-4 w-full sm:w-auto">
                        <div className="relative flex-1">
                            <Icon icon="iconamoon:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={searchFilter}
                                onChange={e => handleSearchFilterChange(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none"
                            />
                        </div>
                        {/* <Select>
                            <SelectTrigger className="w-32 py-2 rounded-lg border border-gray-300">
                                <SelectValue placeholder="Filter by: All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </div>
                </div>

                <div className="">
                    {/* Header */}
                    <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                        <p className="">Opening Date</p>
                        <p className="">Client Name</p>
                        <p className="">Service Type</p>
                        <p className="">Status</p>
                        <p className="">Actions</p>
                    </div>

                    {/* Data Rows */}
                    {pageItems.length > 0 ? (
                        pageItems.map((consultation, i) => {

                            const { user_profile, service_type, status, day, hour } = consultation
                            const name = user_profile?.name

                            return (
                                <div
                                    key={i}
                                    className="md:grid md:grid-cols-[2fr_2fr_1.5fr_1fr_1fr] md:items-center gap-5 py-4 border-b text-sm pl-5 flex flex-col"
                                >
                                    <p className="px-3 py-2 font-medium text-[#101828]">{formatDate1({ dateISO: new Date(day).toISOString() })} {timeToAMPM_FromHour({ hour })}</p>
                                    <p className="px-3 py-2 text-[#101828] capitalize">{name}</p>
                                    <p className="px-3 py-2 text-[#101828] capitalize">{service_type.replaceAll("_", " ")}</p>
                                    {getStatusBadge(status)}
                                    <div className="px-3 py-2">
                                        <Button
                                            className={`rounded-full px-3 py-1 text-sm cursor-pointer ${status === "closed" ? "bg-white border border-[#6941C6] text-[#6941C6]" : "bg-[#6941C6] text-white"}`}
                                            onClick={() => setCurrentConsultation(consultation)}
                                        >
                                            {/* {status === "closed" ? "View Summary" : "Enter Chat"} */}

                                            View Info
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center text-[#667085]">
                            <Icon icon="uil:calender" className="w-16 h-16 text-[#6941C6] mb-4" />
                            <p className="font-semibold text-lg">No data to display</p>
                            <p className="text-sm">Recent appointments will appear here</p>
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
                            </button> */}

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
                            {/* <button
                                disabled={pageListIndex < totalPageListIndex ? false : true}
                                onClick={incrementPageListIndex}
                                style={{
                                    opacity: pageListIndex < totalPageListIndex ? 1 : 0.5
                                }}
                                className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 font-bold"
                            >
                                <span className="hidden md:inline">Next</span> <Icon icon="mdi:arrow-right" className="ml-2" />
                            </button> */}
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

            <Modal
                open={currentConsultation}
                onClose={closeModal}
            >
                <div
                    className="flex items-center gap-2 text-[#6941C6] font-bold text-base cursor-pointer mb-6"
                    onClick={closeModal}
                >
                    <Icon icon="mdi-light:arrow-left" className="text-2xl" />
                    <span>Back</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <ProfileImg
                            profile_img={currentConsultation?.user_profile?.profile_img}
                            containerClass={"w-12 h-12"}
                            name={currentConsultation?.user_profile?.name}
                        />
                    </div>
                    {getStatusBadge(currentConsultation?.status)}
                </div>

                <PatientInfo
                    patient={currentConsultation?.user_profile}
                />

                <div className="flex items-center justify-center gap-2">
                    {
                        currentConsultation?.status == 'ongoing'
                        &&
                        <button
                            onClick={() => {
                                closeModal()
                                navigate('/individual/dashboard/consultation/chat', { state: { user_id: currentConsultation?.user_profile?.id } })
                            }}
                            className="bg-primary-600 text-white font-semibold text-sm w-full py-3 rounded-full cursor-pointer"
                        >
                            Enter chat
                        </button>
                    }
                    <button
                        onClick={() => {
                            closeModal()
                            navigate('/individual/dashboard/caseload/case', { state: { booking_id: currentConsultation?.id } })
                        }}
                        className="bg-[#F4F4F5] text-black font-semibold text-sm w-full py-3 rounded-full cursor-pointer"
                    >
                        More Info
                    </button>
                </div>
            </Modal>

        </div>
    );
};

export default AllConsultation;