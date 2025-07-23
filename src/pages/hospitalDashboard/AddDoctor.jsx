import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const Navigate = useNavigate();
    return (
        <div>
            {/* Top Divider */}
            <hr className="bg-[#D2C3EF] h-1 rounded-full w-full border-none mb-6 mt-3" />
            <div className="bg-white w-full flex items-start justify-between rounded-2xl">
                <div className="w-xl bg-white rounded-2xl px-10 pt-6 pb-4 flex flex-col items-center justify-center">

                    <h1 className="text-2xl font-bold mb-2 text-left w-full">Add Doctor</h1>
                    <p className="mb-6 text-left text-gray-700 w-full text-sm">
                        Basic Information
                    </p>
                    <form className="w-full flex flex-col gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="mb-1 text-sm font-medium">Full Name</label>
                            <input type="text" placeholder="What is the doctor Full Name" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                        </div>
                        {/* Email Address */}
                        <div>
                            <div className="mb-1 text-sm font-medium">Doctor's Email Address</div>
                            <input type="email" placeholder="What is the doctor Email Address" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base " />
                        </div>
                        {/* Official Phone Number */}
                        <div>
                            <div className="mb-1 text-sm font-medium">Doctor's Phone Number</div>
                            <div className="flex">
                                <select className="border border-[#B1B1B0] focus:outline-none rounded-l px-1 py-2 text-base bg-white" defaultValue="+234">
                                    <option value="+234">+234</option>
                                    <option value="+234">+234</option>
                                    <option value="+234">+234</option>
                                </select>
                                <input type="text" placeholder="81*****" className="border-t border-b border-r border-[#B1B1B0] focus:outline-none rounded-r px-3 py-2 w-full text-base" />
                            </div>
                        </div>

                        <label htmlFor="speciality" className="mb-1 text-sm font-medium">Speciality</label>
                        <select id="speciality" className="border border-[#B1B1B0] focus:outline-none rounded-lg px- py-2 bg-white">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>

                        <div>
                            <div className="mb-1 text-sm font-medium">Affilations <span className='text-gray-400 text-sm font-normal'>(optional)</span></div>
                            <input type="email" placeholder="What is the doctor Email Address" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base " />
                        </div>

                        {/* Next Button */}
                        <div className='flex items-center justify-between relative' onClick={() => Navigate('/hospital/dashboard/doctor-credential')}>
                            <Button type="button" className="bg-primary-600 text-white rounded-full py-6 font-semibold text-lg mt-4 w-full flex items-center justify-center cursor-pointer">
                                Next
                            </Button>
                            <Icon icon="mdi:arrow-right" style={{ color: "white" }} className="absolute text-xl right-51 mt-4.5" />
                        </div>

                        {/* Pagination dots */}
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                        </div>
                    </form>
                </div>

                <Button className="rounded-3xl px-4 py-6 bg-primary-600 font-extrabold text-white m-6 cursor-pointer">Invite Doctor via email</Button>
            </div>
        </div>
    )
}

export default AddDoctor