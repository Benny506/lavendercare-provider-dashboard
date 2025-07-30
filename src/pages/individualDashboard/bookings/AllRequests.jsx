import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import TopDivider from "@/components/TopDivider";

import CalendarDateIcon from "/assets/calendar-date1.svg";

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

const bookingsData = [
    { date: "2025-07-12", name: "Chinenye Okeke", time: "10 AM", service: "Medical Consultation" },
    { date: "2025-07-11", name: "Aisha Bello", time: "2 PM", service: "Physical Recovery" },
    { date: "2025-07-10", name: "Ngozi Eze", time: "11 AM", service: "Mental Wellness" },
    { date: "2025-07-09", name: "Ngozi Eze", time: "12 PM", service: "Physical Recovery" },
];

const pastBookingsData = [
    { date: "2025-07-12", name: "Chinenye Okeke", time: "10 AM", service: "Medical Consultation", status: "Accepted" },
    { date: "2025-07-11", name: "Aisha Bello", time: "2 PM", service: "Physical Recovery", status: "Declined" },
    { date: "2025-07-10", name: "Ngozi Eze", time: "11 AM", service: "Mental Wellness", status: "Declined" },
    { date: "2025-07-09", name: "Ngozi Eze", time: "12 PM", service: "Physical Recovery", status: "Accepted" },
];

const serviceData = [
    {
        day:"2025‑07‑06",
        serviceType:"Medical Consultation",
    },
    {
        day:"2025‑07‑03",
        serviceType:"Medical Consultation",
    },
    {
        day:"2025‑07‑11",
        serviceType:"Medical Consultation",
    },
]

function AllRequests() {
    const [tab, setTab] = useState("request");
    const [range, setRange] = useState("This Week");
    const [currentBooking, setCurrentBooking] = useState(null);
    const [modalType, setModalType] = useState(null);

    const filtered = tab === "request" ? bookingsData : pastBookingsData;

    const handleAccept = (booking) => {
        setCurrentBooking(booking);
        setModalType("confirm");
    };
    const handleDecline = (booking) => {
        setCurrentBooking(booking);
        setModalType("declineConfirm");
    };
    const handleViewDetails = (booking) => {
        setCurrentBooking(booking);
        setModalType("details");
    };

    const confirmBooking = () => setModalType("success");
    const confirmDecline = () => setModalType("declineSuccess");
    const closeModal = () => {
        setModalType(null);
        setCurrentBooking(null);
    };

    return (
        <div className="space-y-6">
            <TopDivider />

            {/* Tabs & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "request" ? "bg-[#6941C6] text-white" : "text-[#667085]"}`}
                        onClick={() => setTab("request")}
                    >
                        Request
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "past" ? "bg-[#6941C6] text-white" : "text-[#667085]"}`}
                        onClick={() => setTab("past")}
                    >
                        Past Bookings
                    </button>
                </div>
                <Select value={range} onValueChange={setRange}>
                    <SelectTrigger className="w-32 px-4 py-2 border rounded-lg text-sm">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="This Week">This Week</SelectItem>
                        <SelectItem value="Next Week">Next Week</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 border-b pb-4">
                    <div>
                        <h2 className="text-xl font-bold">{tab === "request" ? "Add Request" : "All Request"}</h2>
                        <p className="text-gray-500">See all your Bookings below</p>
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

                {/* Table */}
                <div className="grid grid-cols-[2.5fr_2.5fr_2fr_2fr_2fr] items-center font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p>Request Date</p>
                    <p>Client Name</p>
                    <p>{tab === "request" ? "Requested Time" : "Scheduled Time"}</p>
                    <p>Service Type</p>
                    <p>{tab === "request" ? "Action" : "Actions"}</p>
                </div>
                {filtered.length > 0 ? (
                    filtered.map((b, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-[2.5fr_2.5fr_2fr_2fr_1fr] items-center gap-5 py-4 border-b text-sm pl-5 cursor-pointer" onClick={() => handleViewDetails(b)}
                        >
                            <p className="px-3 py-2 font-medium text-[#101828]">{b.date}</p>
                            <p className="px-3 py-2 text-[#101828]">{b.name}</p>
                            <p className="px-3 py-2 text-[#101828]">{b.time}</p>
                            <p className="px-3 py-2 text-[#101828]">{b.service}</p>
                            <div className="px-3 py-2 space-x-2 flex items-center">
                                {tab === "request" ? (
                                    <>
                                        <Button className="bg-[#22C55E] text-white rounded-full px-3 py-1 text-sm" onClick={() => handleAccept(b)}>
                                            Accept
                                        </Button>
                                        <Button className="bg-[#EF4444] text-white rounded-full px-3 py-1 text-sm" onClick={() => handleDecline(b)}>
                                            Decline
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex items-center">
                                        {b.status === "Accepted" ? (
                                            <span className="bg-[#22C55E] text-white rounded-full px-3 py-1 text-sm">
                                                Accepted
                                            </span>
                                        ) : (
                                            <span className="bg-[#EF4444] text-white rounded-full px-3 py-1 text-sm">
                                                Declined
                                            </span>
                                        )}
                                        <Button className="bg-[#6941C6] text-white rounded-full px-3 py-1 text-sm ml-2" onClick={() => handleViewDetails(b)}>
                                            View Details
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-[#667085]">
                        <Icon icon="uil:calender" className="w-16 h-16 text-[#6941C6] mb-4" />
                        <p className="font-semibold text-lg">No data to display</p>
                        <p className="text-sm">Recent appointments will appear here</p>
                    </div>
                )}
            </div>

            {/* Modals */}

            {/* Confirm Booking  */}
            <Modal open={modalType === "confirm"}>
                <div className="bg-transparent shadow-none text-primary-600 text-base flex items-center justify-start gap-1 font-extrabold w-full mb-3 cursor-pointer">
                    <Icon icon="mdi-light:arrow-left" className="text-[30px]" onClick={closeModal} />
                    <span className="mt-0.5">Back</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <img src={CalendarDateIcon} alt="Calendar date" className="mb-4 w-16 h-16" />
                    <h3 className="self-start text-lg font-bold mb-4">Confirm Booking</h3>

                </div>
                <div className="flex flex-col items-start gap-2 mb-4">
                    <p className="font-semibold text-lg">Patient Info</p>
                    {currentBooking && (
                        <div className="space-y-2">
                            <p>Mother's name: {currentBooking.name}</p>
                            <p>Age: {currentBooking.age}</p>
                            <p>Postpartum Days: </p>
                            <p>Requsted Time: {currentBooking.time}, {currentBooking.date}</p>
                            <p>Service Type: {currentBooking.service}</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex w-full gap-1">
                    <Button className="rounded-4xl flex-1/2 bg-[#F1ECFA] py-6 px-6 text-md font-bold text-primary-600 cursor-pointer" onClick={closeModal}>Cancel</Button>
                    <Button className="rounded-4xl flex-1/2 bg-primary-600 py-6 text-md px-6 font-bold text-white cursor-pointer" onClick={confirmBooking}>Accept</Button>
                </div>

                <p className="text-sm text-center text-[#667085] mt-2">This will add the session to your upcoming calendar.</p>
            </Modal>

            <Modal open={modalType === "success"} onClose={closeModal}>
                <div className="text-center p-4">
                    {/* <Icon icon="mdi:checkbox-marked-circle-outline" className="text-green-500 w-12 h-12 mx-auto mb-4" /> */}
                    <img src="/assets/accept.svg" alt="" className="text-green-500 w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-4">Booking Confirmed</h3>
                    <Button className="rounded-4xl flex-1/2 bg-primary-600 py-6 text-md px-6 font-bold text-white cursor-pointer w-full" onClick={closeModal}>Continue</Button>
                </div>
            </Modal>

            <Modal open={modalType === "declineConfirm"} onClose={closeModal}>
                <div className="bg-transparent shadow-none text-primary-600 text-base flex items-center justify-start gap-1 font-extrabold w-full mb-3 cursor-pointer">
                    <Icon icon="mdi-light:arrow-left" className="text-[30px]" onClick={closeModal} />
                    <span className="mt-0.5">Back</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <img src={CalendarDateIcon} alt="Calendar date" className="mb-4 w-16 h-16" />
                    <h3 className="self-start text-lg font-bold mb-4">Decline Booking</h3>

                </div>
                <div className="flex flex-col items-start gap-2 mb-4">
                    <p className="font-semibold text-lg">Patient Info</p>
                    {currentBooking && (
                        <div className="space-y-2">
                            <p>Mother's name: {currentBooking.name}</p>
                            <p>Age: {currentBooking.age}</p>
                            <p>Postpartum Days: </p>
                            <p>Requsted Time: {currentBooking.time}, {currentBooking.date}</p>
                            <p>Service Type: {currentBooking.service}</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start gap-2 mb-4">
                    <p className="font-bold text-lg">Reason for declining (optional)</p>
                    <textarea
                        placeholder=""
                        className="w-full border rounded-lg mb-4"
                    />
                </div>
                <div className="mt-4 flex w-full gap-1">
                    <Button className="rounded-4xl flex-1/2 bg-[#F1ECFA] py-6 px-6 text-md font-bold text-primary-600 cursor-pointer" onClick={closeModal}>Cancel</Button>
                    <Button className="rounded-4xl flex-1/2 bg-[#E41C11] py-6 text-md px-6 font-bold text-white cursor-pointer" onClick={confirmBooking}>Accept</Button>
                </div>
            </Modal>

            <Modal open={modalType === "declineSuccess"} onClose={closeModal}>
                <div className="text-center">
                    <img src="/assets/accept.svg" alt="" className="text-green-500 w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-4">Booking Declined</h3>
                    <Button className="rounded-4xl flex-1/2 bg-primary-600 py-6 text-md px-6 font-bold text-white cursor-pointer w-full" onClick={closeModal}>Continue</Button>
                </div>
            </Modal>

            <Modal open={modalType === "details"} onClose={closeModal}>
                <div className="bg-transparent shadow-none text-primary-600 text-base flex items-center justify-start gap-1 font-extrabold w-full mb-3 cursor-pointer">
                    <Icon icon="mdi-light:arrow-left" className="text-[30px]" onClick={closeModal} />
                    <span className="mt-0.5">Back</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <img src={CalendarDateIcon} alt="Calendar date" className="mb-4 w-16 h-16" />
                    <h3 className="self-start text-lg font-bold mb-2">Patient Info</h3>
                </div>

                <div className="flex flex-col items-start gap-2 mb-4">
                    {currentBooking && (
                        <div className="space-y-2">
                            <p>Mother's name: {currentBooking.name}</p>
                            <p>Age: {currentBooking.age}</p>
                            <p>Postpartum Days: </p>
                            <div className="flex flex-col gap-2">
                                <p>Contact</p>
                                <div className="flex gap-3 text-md">
                                    <div className="flex gap-1">
                                        <Icon icon="line-md:phone" width="24" height="24"  style={{color: "black"}} />
                                        <p>+234812345678</p>
                                    </div>

                                    <div className="flex gap-1">
                                        <Icon icon="material-symbols-light:mail-outline-rounded" width="24" height="24"  style={{color: "black"}} />
                                        <p>youremail@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                        <div className="font-bold mb-2">Requested Slots Review</div>
                        <div className="border-b border-gray-200 rounded-md divide-y divide-gray-200">
                            {/* Header Row */}
                            <div className="flex justify-between px-4 py-2 text-sm font-medium text-gray-700">
                                <span className="p-3">Day</span>
                                <span className="p-3">Service type</span>
                            </div>
                            {
                                serviceData.map((service, id) => (
                                    <div key={id} className="flex justify-between px-4 py-2 text-sm font-medium text-gray-700 w-full">
                                        <p className="p-3">{service.day}</p>
                                        <p className="p-3">{service.serviceType}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            
                <Button className="rounded-4xl flex-1/2 bg-primary-600 py-6 text-md px-6 font-bold text-white cursor-pointer w-full" onClick={closeModal}>Continue</Button>
            </Modal>
        </div>
    );
}

export default AllRequests;