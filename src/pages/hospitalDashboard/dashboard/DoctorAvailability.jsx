import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const DoctorAvailability = () => {
    const Navigate = useNavigate();
    return (
        <div>
            <TopDivider />
            <div className="bg-white w-full flex items-start justify-between rounded-2xl">
                <div className="w-lg bg-white rounded-2xl px-10 pt-6 pb-4 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-2 text-left w-full">Add Doctor</h1>
                    <p className="mb-6 text-left text-gray-700 w-full text-sm">
                        Availability Setup
                    </p>

                    <div className='w-full'>
                        {/* Operating Hours */}
                    <div className="w-full flex flex-col gap-4">
                        {/* Header */}
                        <div className="font-semibold text-lg">Operating Hours</div>

                        {/* Days row */}
                        <div className="flex flex-col items-start gap-2">
                            <label className="text-sm">Days</label>
                            <div className="flex items-center gap-2 w-full relative">
                                <input
                                    type="text"
                                    placeholder="Monday - Sunday"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    readOnly
                                />
                                <Switch id="toggle-days" className="absolute right-3" />
                            </div>
                        </div>

                        {/* Time row */}
                        <div className="flex w-full mb-2">
                            <div className="flex items-stretch gap-2 w-full">
                                {/* Start Time */}
                                <div className="flex flex-col gap-1 w-full">
                                    <label className="text-sm">Start time</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        readOnly
                                    />
                                </div>

                                {/* Line Separator */}
                                <div className="flex items-center">
                                    <span className="bg-gray-400 h-1 w-5 rounded-2xl mt-6" />
                                </div>

                                {/* End Time */}
                                <div className="flex flex-col gap-1 w-full">
                                    <label className="text-sm">End time</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Consultation Duration */}
                    <div className='w-full flex flex-col gap-3 my-6'>
                        <div className="mb-2">Consultation Duration</div>
                        {[
                            "15 mins",
                            "30 mins",
                            "45 mins",
                            "60 mins",
                        ].map((item) => (
                            <label className="flex items-center gap-2 mb-5 cursor-pointer select-none">
                                <input type="checkbox" className="peer hidden" />
                                <span
                                    className="inline-flex items-center justify-center w-5 h-5 border rounded-[6px] bg-white shadow-[2px_2px_4px_rgba(0,0,0,1)] border-[#000000] mt-0.5"
                                    style={{ minWidth: 20, borderWidth: '1px' }}
                                ></span>
                                <span className="text-base">{item}</span>
                            </label>

                        ))}
                        <div className="text-md text-gray-500 font-medium">Others</div>
                    </div>



                    {/* Consultation Mode (Multi-select) */}
                    <div className='w-full flex flex-col gap-3'>
                        <div className="mb-2">Consultation Mode <span className='font-medium text-gray-400'>(Multi-select)</span></div>
                        {[
                            "Video",
                            "Phone",
                            "In-person",
                        ].map((item) => (
                            <label className="flex items-center gap-2 mb-5 cursor-pointer select-none">
                                <input type="checkbox" className="peer hidden" />
                                <span
                                    className="inline-flex items-center justify-center w-5 h-5 border rounded-[6px] bg-white shadow-[2px_2px_4px_rgba(0,0,0,1)] border-[#000000] mt-0.5"
                                    style={{ minWidth: 20, borderWidth: '1px' }}
                                ></span>
                                <span className="text-base">{item}</span>
                            </label>

                        ))}
                        <div className="text-md text-gray-500 font-medium">Others</div>
                    </div>

                    <div className='flex items-center justify-between relative' onClick={() => Navigate('/hospital/dashboard/doctor-credential')}>
                        <Button type="button" className="bg-primary-600 text-white rounded-full py-6 font-semibold text-lg mt-4 w-full flex items-center justify-center cursor-pointer">
                            Next
                        </Button>
                        <Icon icon="mdi:arrow-right" style={{ color: "white" }} className="absolute text-xl right-43 mt-4.5" />
                    </div>
                    </div>


                    <div className="flex items-center justify-between w-full mt-6 px-4">
                        <p className="text-primary-500 font-extrabold">Previous</p>
                        {/* Pagination dots */}
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                        </div>
                    </div>

                </div>
                <Button className="rounded-3xl px-4 py-6 bg-primary-600 font-extrabold text-white m-6 cursor-pointer">Invite Doctor via email</Button>
            </div>
        </div>
    )
}

export default DoctorAvailability