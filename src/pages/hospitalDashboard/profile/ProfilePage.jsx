import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import React from 'react'

const ProfilePage = () => {
    return (
        <div>

            <TopDivider />

            <div className="w-full bg-white rounded-2xl p-3">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                        <img src="/assets/hospital-logo.svg" alt="" />
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <p className="font-bold">Grace Maternity Center</p>
                                <span className="bg-[#FCE8E7] text-[#CF190F] rounded-3xl px-2">Unverified</span>
                            </div>
                            <Button className="bg-transparent border-[#6F3DCB] border text-[#6F3DCB] max-w-max">
                                Upload Logo
                            </Button>
                        </div>
                    </div>

                    <Button className="bg-[#6F3DCB] text-white rounded-lg">
                        Edit
                        <Icon icon="material-symbols:edit-outline" width="24" height="24" style={{ color: "#fff" }} />
                    </Button>
                </div>

                {/* Form  */}

                <div className="max-w-xl p-6 flex flex-col gap-2">
                    <p className='font-bold'>Hospital information</p>

                    <form action="" className='flex flex-col gap-3'>
                        <div>
                            <label className="mb-1 text-sm font-bold">Hospital Name</label>
                            <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                        </div>
                        <div>
                            <label className="mb-1 text-sm font-bold">Registration ID</label>
                            <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                        </div>

                        <div className='flex gap-2'>
                            <div className='flex-1'>
                                <label className="mb-1 text-sm font-bold">Contact Phone</label>
                                <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                            </div>
                            <div className='flex-1'>
                                <label className="mb-1 text-sm font-bold">Contact Email</label>
                                <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 text-sm font-bold">Address</label>
                            <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                        </div>

                        <div className='flex gap-2'>
                            <div className='flex-1'>
                                <label className="mb-1 text-sm font-bold">Country</label>
                                <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                            </div>
                            <div className='flex-1'>
                                <label className="mb-1 text-sm font-bold">State</label>
                                <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <div className='flex-1'>
                                <label className="mb-1 text-sm font-bold">City/Region</label>
                                <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                            </div>
                            <div className='flex-1'>
                                <label className="mb-1 text-sm font-bold">Website (optional)</label>
                                <input type="text" placeholder="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="" className='font-bold'>Established Year</label>
                            <select name="" id="" className='border border-[#B1B1B0] focus:outline-none rounded px-3 py-2 w-full text-base'>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage