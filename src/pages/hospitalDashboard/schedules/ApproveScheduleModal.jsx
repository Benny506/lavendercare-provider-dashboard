import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ApproveDoctorModal = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            {/* Background Image Container */}
            <div className="bg-img rounded-xl p-4 w-full max-w-sm shadow-xl relative">
                <div className="bg-white rounded-xl p-6 w-full relative flex flex-col gap-1">

                    {/* Back Icon */}
                    <div className="flex items-center gap-2 text-purple-600 cursor-pointer mb-4">
                        <Icon icon="material-symbols:arrow-back" className="text-xl" />
                        <span className="font-semibold text-sm">Back</span>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="/assets/Avatar.svg" alt="Dr Grace Bello" className="" />
                            <AvatarFallback>GB</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-lg">Dr Grace Bello</div>
                            <div className="text-sm text-gray-500">OB-GYN</div>
                        </div>
                    </div>

                    {/* Case ID & Status */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="font-semibold text-base">Case ID: <span className="text-black">#LC-2025-0345</span></div>
                        <span className="text-xs bg-orange-100 text-orange-500 font-medium px-2 py-0.5 rounded-full">Pending</span>
                    </div>

                    {/* Patient Info */}
                    <div className="mb-4 flex flex-col gap-2">
                        <div className="font-bold mb-1">Patient Info</div>
                        <div className="text-sm">Mother’s name: <span className="font-medium">Sarah Adebayo</span></div>
                        <div className="text-sm">Age: <span className="font-medium">35</span></div>
                        <div className="text-sm">Postpartum Days: <span className="font-medium">60</span></div>
                    </div>

                    {/* Requested Slots Review */}
                    <div className="mb-4">
                        <div className="font-bold mb-2">Requested Slots Review</div>
                        <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {/* Header Row */}
                            <div className="flex justify-between px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                                <span>Day</span>
                                <span>Time Slot</span>
                            </div>
                            {/* Monday Row */}
                            <div className="flex justify-between px-4 py-2 text-sm text-gray-600">
                                <span>Monday</span>
                                <span>9:00 - 12:00 AM</span>
                            </div>
                            {/* Wednesday Row */}
                            <div className="flex justify-between px-4 py-2 text-sm text-gray-600">
                                <span>Wednesday</span>
                                <span>2:00 - 5:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className="mb-4">
                        <div className="font-bold mb-1">Add Internal Notes</div>
                        <textarea
                            placeholder="Type here..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
                            rows={3}
                        />
                    </div>

                    {/* Confirm Button */}
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl">
                        Confirm Approval
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApproveDoctorModal;