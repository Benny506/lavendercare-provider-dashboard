import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const slots = [
    {
        day:"2025‑07‑06",
        event:"Consultation #0321 (Ongoing)",
        notes:"“Reviewed screening…”"
    },
    {
        day:"2025‑07‑03",
        event:"Screening submission received",
        notes:"Score: Moderate Anxiety"
    },
    {
        day:"2025‑07‑11",
        event:"Case created",
        notes:"“Initial assessment”"
    },
]

const ViewCase = () => {
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
                    </div>

                    {/* Assigned Doctor */}
                    <p className="mb-3">
                        <span className="font-bold">Assigned Doctor:</span>
                        Dr. Tolu Adebayo
                    </p>

                    {/* Requested Slots Review */}
                    <div className="mb-4">
                        <div className="font-bold mb-2">Requested Slots Review</div>
                        <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {/* Header Row */}
                            <div className="flex justify-between px-4 py-2 text-sm font-medium text-gray-700">
                                <span>Day</span>
                                <span>Event</span>
                                <span>Notes (if any)</span>
                            </div>
                            {
                                slots.map((slot, id) => (
                                    <div key={id} className="flex justify-between px-4 py-2 text-sm font-medium text-gray-700 w-full">
                                        <p>{slot.day}</p>
                                        <p>{slot.event}</p>
                                        <p>{slot.notes}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <Button className="w-full bg-primary-600 text-white text-sm font-semibold rounded-xl py-6">
                        Confirm Approval
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewCase;