import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icon } from '@iconify/react'
import React from 'react'

const AssignDoctor = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            {/* Background Image Container */}
            <div className="bg-img rounded-xl p-4 w-full max-w-md shadow-xl relative">

                <div className="bg-white rounded-xl p-6 w-full relative flex flex-col gap-1">

                    {/* Back Icon */}
                    <div className="flex items-center gap-2 text-primary-600 cursor-pointer mb-4">
                        <Icon icon="material-symbols:arrow-back" className="text-xl" />
                        <span className="font-semibold text-sm">Back</span>
                    </div>

                    <p className="w-full text-center"><span>Case ID: </span>#LC‑2025‑0345</p>

                    {/* Patient Info */}
                    <div className="flex flex-col gap-3 mb-4">
                        <p className="text-2xl font-bold">Patient Info</p>
                        <div className="flex flex-col gap-2">
                            <p><span>Mothers's name: </span>Sarah Adebayo</p>
                            <p><span>Age: </span>35</p>
                            <p><span>Postpartum Days: </span>60</p>
                            <div className="flex flex-col gap-2">
                                <p>Contact</p>
                                <div className="flex gap-3 text-md">
                                    <div className="flex gap-1">
                                        <Icon icon="line-md:phone" width="24" height="24" style={{ color: "black" }} />
                                        <p>+234812345678</p>
                                    </div>

                                    <div className="flex gap-1">
                                        <Icon icon="material-symbols-light:mail-outline-rounded" width="24" height="24" style={{ color: "black" }} />
                                        <p>youremail@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Assign a Doctor  */}
                    <Select>
                        <SelectTrigger className="w-full py-6 rounded-lg border border-gray-300">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="doctor"></SelectItem>
                            <SelectItem value="doctor"></SelectItem>
                            <SelectItem value="doctor"></SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>
        </div>
    )
}

export default AssignDoctor