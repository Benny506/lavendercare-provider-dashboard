import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Icon } from '@iconify/react'

const doctors = [
    {
        name: "Dr. Grace Bello",
        specialty: "OB‑GYN",
        totalConsults: 132,
        avgRating: 4.3,
        isActive: true,
    },
    {
        name: "Dr. Emeka Obi",
        specialty: "Maternal Mental Health",
        totalConsults: 98,
        avgRating: 4.8,
        isActive: true,
    },
    {
        name: "Nurse Lillian James",
        specialty: "Postnatal Recovery",
        totalConsults: 76,
        avgRating: 4.2,
        isActive: false,
    },
    {
        name: "Dr. David Okorie",
        specialty: "General Practitioner",
        totalConsults: 121,
        avgRating: 4.5,
        isActive: true,
    },
    {
        name: "Doula Funke Adeyemi",
        specialty: "Birth & Labor Support",
        totalConsults: 65,
        avgRating: 4.4,
        isActive: true,
    },
    {
        name: "Therapist Aisha Lawal",
        specialty: "Postpartum Therapy",
        totalConsults: 89,
        avgRating: 4.7,
        isActive: true,
    },
    {
        name: "Dr. Chuka Nwosu",
        specialty: "Pelvic Health Specialist",
        totalConsults: 54,
        avgRating: 4.8,
        isActive: true,
    },
];


const AllDoctors = () => {
    return (
        <div>
            <TopDivider />

            <div className='w-full flex flex-col md:flex-row justify-between items-start'>
                <div className="flex flex-col md:flex-row flex-1 mb-4 md:max-w-2xl w-full gap-2 md:gap-0 rounded-2xl">
                    {/* Card 1 */}
                    <div className="flex-1 bg-white p-6 rounded-lg md:rounded-l-lg">
                        <p className="text-md font-medium">Total Doctors</p>
                        <div className="flex items-start gap-4 py-4">
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex-1 bg-[#F1ECFA] p-6 rounded-lg md:rounded-none">
                        <div className='flex gap-2'>
                            <Icon icon="ic:outline-account-box" width="24" height="24" style={{ color: "#669F2A" }} />
                            <p className="text-md font-medium">Active</p>
                        </div>
                        <div className="flex items-start gap-4 py-4">
                            <p className="text-2xl font-bold">23</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex-1 bg-[#F1ECFA] p-6 md:rounded-r-lg rounded-lg">
                        <div className='flex gap-2'>
                            <Icon icon="ic:outline-account-box" width="24" height="24" style={{ color: "#8B8B8A" }} />
                            <p className="text-md font-medium">Inctive</p>
                        </div>
                        <div className="flex items-start gap-4 py-4">
                            <p className="text-2xl font-bold">1</p>
                        </div>
                    </div>
                </div>
                <Button className="rounded-3xl px-4 py-6 bg-primary-600 font-extrabold text-white m-6 cursor-pointer">Add Doctor</Button>
            </div>


            <div className="w-full bg-white rounded-xl py-6 px-4 sm:px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <div>
                        <p className="text-lg font-bold text-black">All Doctors</p>
                        <p className="text-sm text-gray-600">See all your doctors below</p>
                    </div>
                    <p className="text-primary-600 font-semibold cursor-pointer hover:underline">
                        View all Doctors →
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="relative w-full sm:w-64">
                        <Icon
                            icon="iconamoon:search"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none text-gray-600 placeholder:text-gray-400"
                        />
                    </div>
                    <Select className="w-full sm:w-40">
                        <SelectTrigger className="w-full sm:w-40 py-2 rounded-lg border border-gray-300">
                            <SelectValue placeholder="Filter by: All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table Headers (hidden on sm) */}
                <div className="hidden sm:grid grid-cols-[1.5fr_1.5fr_2fr_1fr_0.5fr_0.5fr] font-semibold text-sm text-gray-600 border-b pb-3 gap-5 pl-5">
                    <p>Name</p>
                    <p>Specialty</p>
                    <p>Total Consults</p>
                    <p>Avg Rating</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                {/* Table Rows */}
                {doctors.length > 0 ? (
                    doctors.map((doc, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col sm:grid sm:grid-cols-[1.5fr_1.5fr_2fr_1fr_0.5fr_0.5fr] items-start sm:items-center gap-3 sm:gap-5 py-4 border-b text-sm pl-0 sm:pl-5"
                        >
                            {/* Mobile: stacked with labels */}
                            <div className="flex sm:block justify-between w-full">
                                <span className="font-medium text-gray-500 sm:hidden">Name:</span>
                                <p>{doc.name}</p>
                            </div>
                            <div className="flex sm:block justify-between w-full">
                                <span className="font-medium text-gray-500 sm:hidden">Specialty:</span>
                                <p>{doc.specialty}</p>
                            </div>
                            <div className="flex sm:block justify-between w-full">
                                <span className="font-medium text-gray-500 sm:hidden">Total Consults:</span>
                                <p className="font-semibold">{doc.totalConsults}</p>
                            </div>
                            <div className="flex sm:block justify-between w-full">
                                <span className="font-medium text-gray-500 sm:hidden">Avg Rating:</span>
                                <p>({doc.avgRating.toFixed(1)})</p>
                            </div>
                            <div className="flex sm:block justify-between w-full">
                                <span className="font-medium text-gray-500 sm:hidden">Status:</span>
                                <Switch
                                    checked={doc.isActive}
                                    className="data-[state=checked]:bg-primary-600 bg-primary-600"
                                    onCheckedChange={(val) => { }}
                                />
                            </div>
                            <div className="flex sm:block justify-between w-full">
                                <span className="font-medium text-gray-500 sm:hidden">Actions:</span>
                                <div className="flex items-center space-x-3">
                                    <Icon
                                        icon="heroicons:pencil-square"
                                        className="cursor-pointer text-lg text-primary-600"
                                    />
                                    <Icon
                                        icon="heroicons:trash"
                                        className="cursor-pointer text-lg text-red-600"
                                    />
                                </div>
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
                <div className="mt-6 flex justify-between items-center">
                    {/* Previous */}
                    <button className="flex items-center text-gray-600 hover:text-gray-800 font-bold">
                        <Icon icon="mdi:arrow-left" className="mr-2 sm:mr-0" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page numbers (hidden on sm) */}
                    <div className="flex space-x-1 md:space-x-2">
                        {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
                            <button
                                key={i}
                                className={`w-8 h-8 rounded-full ${p === 1 ? "bg-primary-100 text-primary-600" : "text-gray-600"
                                    } flex items-center justify-center`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {/* Next */}
                    <button className="flex items-center text-gray-600 hover:text-gray-800 font-bold">
                        <span className="hidden sm:inline">Next</span>
                        <Icon icon="mdi:arrow-right" className="ml-2 sm:ml-0" />
                    </button>
                </div>
            </div>


        </div>
    )
}

export default AllDoctors