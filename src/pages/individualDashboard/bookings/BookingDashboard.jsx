import TopDivider from "@/components/TopDivider";

export default function BookingDashboard() {
    const pastBookings = [
        {
            id: 1,
            service: "Medical Consultation",
            date: "Jul 15, 2025",
            time: "10:00 AM",
            status: "Accepted",
            statusColor: "bg-green-100 text-green-800"
        },
        {
            id: 2,
            service: "Therapy Session",
            date: "Jul 10, 2025",
            time: "2:00 PM",
            status: "Accepted",
            statusColor: "bg-green-100 text-green-800"
        },
        {
            id: 3,
            service: "Psychiatric Evaluation",
            date: "Jul 5, 2025",
            time: "11:30 AM",
            status: "Completed",
            statusColor: "bg-purple-100 text-purple-800"
        },
        {
            id: 4,
            service: "Medical Consultation",
            date: "Jun 28, 2025",
            time: "9:00 AM",
            status: "Completed",
            statusColor: "bg-purple-100 text-purple-800"
        },
        {
            id: 5,
            service: "Therapy Session",
            date: "Jun 20, 2025",
            time: "4:00 PM",
            status: "Declined",
            statusColor: "bg-red-100 text-red-800"
        }
    ];

    return (
        <div>
            <TopDivider />
            <div className="flex bg-white min-h-screen  rounded-3xl">
                {/* Left Panel */}
                <div className="w-80 bg-white p-6 border-r border-gray-200  rounded-l-3xl">
                    {/* Profile Section */}
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mr-4">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='20' fill='%23333'/%3E%3Cpath d='M20 85 C 20 65, 35 60, 50 60 S 80 65, 80 85' fill='%23333'/%3E%3C/svg%3E" alt="Profile" className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Chinenye Okeke</h2>
                            <p className="text-sm text-gray-500">Booking ID : #BK-2025-078</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-6">
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                            Accepted
                        </span>
                    </div>

                    {/* Booking Overview */}
                    <div className="mb-6  border-b border-gray-400 pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Overview</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500">Service:</span>
                                <span className="ml-2 text-gray-900">Medical Consultation</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Scheduled Time:</span>
                                <span className="ml-2 text-gray-900">Jul 15, 2025 - 10:00 AM</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Duration:</span>
                                <span className="ml-2 text-gray-900">30 minutes</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Fee Charged:</span>
                                <span className="ml-2 text-gray-900">₦30,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Patient Information */}
                    <div className="mb-6  border-b border-gray-400 pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500">Age:</span>
                                <span className="ml-2 text-gray-900">29</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Postpartum Day:</span>
                                <span className="ml-2 text-gray-900">21</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Contact:</span>
                                <span className="ml-2 text-gray-900">email@example.com</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Phone no</span>
                                <span className="ml-2 text-gray-900">0801 234 5678</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Pregnancy Status:</span>
                                <span className="ml-2 text-gray-900">Postpartum</span>
                            </div>
                        </div>
                    </div>

                    {/* Session Summary */}
                    <div className=" pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Summary & Notes</h3>
                        <p className="text-sm text-gray-400 border p-2 rounded-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...
                        </p>
                    </div>

                    {/* Attachments */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Attachments & Reports</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Prescription Document</span>
                                <button className="text-purple-600 text-sm font-medium">Download</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Test Results</span>
                                <button className="text-purple-600 text-sm font-medium">View/Download</button>
                            </div>
                            <div className="mb-4">
                                <span className="text-sm text-gray-700">Full Medical Report</span>
                            </div>
                            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium w-full">
                                Download Consolidated PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-6">
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-6">Past Bookings</h2>

                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 mb-4 text-sm font-medium text-gray-500 border-b border-gray-200 pb-4">
                            <div>Services</div>
                            <div>Date</div>
                            <div>Time</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>

                        {/* Table Rows - Generated from array */}
                        <div className="space-y-4">
                            {pastBookings.map((booking) => (
                                <div key={booking.id} className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-100">
                                    <div className="text-sm text-gray-900">{booking.service}</div>
                                    <div className="text-sm text-gray-900">{booking.date}</div>
                                    <div className="text-sm text-gray-900">{booking.time}</div>
                                    <div>
                                        <span className={`${booking.statusColor} px-3 py-1 rounded-full text-xs font-medium`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div>
                                        <button className="bg-primary-600 text-white px-4 py-2 rounded-4xl text-sm font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Buttons */}
                        <div className="flex justify-between mt-8">
                            <button className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg font-medium">
                                Reschedule
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center">
                                Start Follow-Up Chat
                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}