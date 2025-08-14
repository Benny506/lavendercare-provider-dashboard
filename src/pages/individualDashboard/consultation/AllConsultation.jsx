import TopDivider from "@/components/TopDivider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatDate1 } from "@/lib/utils";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Modal component
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-img rounded-2xl p-4 w-full max-w-md shadow-xl relative">
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

const AllConsultation = () => {

    const navigate = useNavigate()

    const bookings = useSelector(state => getUserDetailsState(state).bookings)

    const [tab, setTab] = useState("all");
    const [modalType, setModalType] = useState(null);
    const [currentConsultation, setCurrentConsultation] = useState(null);
    const [tabConsultations, setTabConsultations] = useState([])
    const [filteredConsultations, setFilteredConsultations] = useState([])
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        if(bookings){
            setSearchFilter('')

            if(tab == 'all'){
                setFilteredConsultations(bookings)
                setTabConsultations(bookings)
            
            } else{
                const filtered_forTab = bookings.filter(b => b.status == tab)
                setTabConsultations(filtered_forTab)
                setFilteredConsultations(filtered_forTab)
            }
        }
    }, [tab])

    useEffect(() => {
        if(searchFilter){
            const filtered = tabConsultations.filter(c => {
                const { user_profile, service_type } = c
                const name = user_profile?.name

                return(
                    (name?.toLowerCase().includes(searchFilter?.toLowerCase())
                    ||
                    searchFilter?.toLowerCase().includes(name?.toLowerCase()))

                    ||

                    (service_type?.toLowerCase().includes(searchFilter?.toLowerCase())
                    ||
                    searchFilter?.toLowerCase().includes(service_type?.toLowerCase()))                    
                )
            })

            setFilteredConsultations(filtered)
        }
    }, [searchFilter])

    const handleSearchFilterChange = filter => {
        setSearchFilter(filter)

        if(!filter){
            setFilteredConsultations(tabConsultations)
        }
        
        return;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "new": return "bg-[#F0F5EA] text-[#669F2A]";
            case "ongoing": return "bg-[#FFF0E6] text-[#ED6C02]";
            case "Closed": return "bg-[#FCE8E7] text-[#E41C11]";
            default: return "";
        }
    };

    const handleViewDetails = (item) => {
        setCurrentConsultation(item);
        setModalType("confirm");
    };

    const closeModal = () => {
        setModalType(null);
        setCurrentConsultation(null);
    };

    return (
        <div>
            <TopDivider />

            {/* Tabs and Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex space-x-4">
                    {["all", "new", "ongoing", "closed"].map(key => (
                        <button
                            key={key}
                            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium cursor-pointer ${tab === key ? "bg-[#6941C6] text-white" : "text-[#667085]"}`}
                            onClick={() => setTab(key)}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                    ))}
                </div>

                {/* <Button className="bg-primary-600 rounded-3xl cursor-pointer">
                    <Icon icon="icon-park-outline:message" style={{ color: "white" }} />
                    New Consultation
                </Button> */}
            </div>

            {/* Main Table Card */}
            <div className="rounded-lg lg:max-h-[70vh] lg:overflow-y-auto bg-white p-6 shadow-sm">
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

                {/* Header */}
                <div className="grid grid-cols-[2.5fr_2.5fr_2fr_2.5fr_1.5fr] items-center font-semibold text-xs md:text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p className="">Opening Date</p>
                    <p className="">Client Name</p>
                    <p className="">Service Type</p>
                    <p className="">Status</p>
                    <p className="">Actions</p>
                </div>

                {/* Data Rows */}
                {filteredConsultations.length > 0 ? (
                    filteredConsultations.map((consultation, i) => {

                        const { user_profile, service_type, status, day } = consultation
                        const name = user_profile?.name
                        
                        return (
                            <div
                                key={i}
                                className="grid grid-cols-[2.5fr_2.5fr_2fr_2.5fr_1.8fr] items-center gap-5 py-4 border-b text-sm pl-5"
                            >
                                <p className="px-3 py-2 font-medium text-[#101828]">{formatDate1({ dateISO: new Date(day).toISOString() })}</p>
                                <p className="px-3 py-2 text-[#101828] capitalize">{name}</p>
                                <p className="px-3 py-2 text-[#101828] capitalize">{service_type.replaceAll("_", " ")}</p>
                                <p className={`text-center px-3 py-1 text-sm font-medium w-fit rounded-xl ${getStatusClass(status)}`}>
                                    {status}
                                </p>
                                <div className="px-3 py-2">
                                    <Button
                                        className={`rounded-full px-3 py-1 text-sm cursor-pointer ${status === "closed" ? "bg-white border border-[#6941C6] text-[#6941C6]" : "bg-[#6941C6] text-white"}`}
                                        onClick={() => handleViewDetails(consultation)}
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
            </div>

            <Modal open={modalType === "confirm"} onClose={closeModal}>
                <div
                    className="flex items-center gap-2 text-[#6941C6] font-bold text-base cursor-pointer mb-6"
                    onClick={closeModal}
                >
                    <Icon icon="mdi-light:arrow-left" className="text-2xl" />
                    <span>Back</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={`/avatar.svg`} alt="avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <span className={`${getStatusClass(currentConsultation?.status)} text-sm capitalize font-semibold py-1 px-3 rounded-full`}>
                        { currentConsultation?.status }
                    </span>
                </div>

                {currentConsultation && ( 
                    <div className="flex flex-col text-sm text-gray-700 space-y-2 mb-6">

                        <p className="font-bold text-xl text-black">Patient Info</p>
                        <p>
                            <span className="font-semibold text-black">Mother’s name:</span>{" "}
                            {currentConsultation?.user_profile?.name}
                        </p>
                        <p>
                            <span className="font-semibold text-black">Age:</span>{" "}
                            {currentConsultation?.user_profile?.age ?? "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold text-black">Postpartum Days:</span>{" "}
                            {currentConsultation.postpartumDays ?? "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold text-black">Services Type:</span>{" "}
                            {currentConsultation?.service_type}
                        </p>
                    </div>
                )}

                <button
                    onClick={() => {
                        closeModal()
                        navigate('/individual/dashboard/consultation/chat', { state: { user_id: currentConsultation?.user_profile?.id } })
                    }}
                    className="bg-primary-600 text-white font-semibold text-sm w-full py-3 rounded-full cursor-pointer"
                >
                    Enter chat
                </button>
            </Modal>

        </div>
    );
};

export default AllConsultation;
