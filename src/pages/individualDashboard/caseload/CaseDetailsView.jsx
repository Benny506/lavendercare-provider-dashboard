import TopDivider from "@/components/TopDivider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Bookmark, CheckCircle, FileText, Stethoscope } from "lucide-react";

const CaseDetailsView = () => {
    const timelineEvents = [
        {
            icon: <Calendar className="w-5 h-5 text-blue-500" />,
            title: "Consultation - 07/15/2025, 2:00 PM",
            description: "Note preview: Patient is experiencing mild anxiety...",
            type: "consultation"
        },
        {
            icon: <Bookmark className="w-5 h-5 text-green-500" />,
            title: "Booking made - 07/17/2025, 2:00 PM",
            description: "",
            type: "booking"
        },
        {
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            title: "Screening Completed",
            description: "Completed on 07/20/2025",
            type: "screening"
        },
        {
            icon: <FileText className="w-5 h-5 text-blue-500" />,
            title: "Prescription Issued",
            description: "Medication: Sertraline, Dosage: 50mg",
            type: "prescription"
        },
        {
            icon: <FileText className="w-5 h-5 text-gray-500" />,
            title: "Therapy Notes Added",
            description: "Notes added on 07/10/2024",
            type: "notes"
        },
        {
            icon: <Calendar className="w-5 h-5 text-blue-500" />,
            title: "Consultation - 07/01/2024, 10:00 AM",
            description: "Note preview: Initial assessment and treatment plan...",
            type: "consultation"
        }
    ];

    return (
        <div>
            <TopDivider />
            <div className="flex p-6 min-h-screen">
            {/* Left Panel - Patient Information */}
            <div className="max-w-xs  bg-white rounded-l-lg p-6 h-full border-r border-gray-200 shadow-sm">
                {/* Patient Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="/api/placeholder/64/64" alt="Chinenye Okeke" />
                        <AvatarFallback className="bg-orange-200 text-orange-800 text-lg font-semibold">
                            CO
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Chinenye Okeke</h2>
                        <p className="text-gray-500 text-sm">Case ID : #2025-078</p>
                    </div>
                </div>

                <div className="mb-6">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        Ongoing
                    </span>
                </div>

                {/* Patient Information */}
                <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span className="font-medium">29</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Postpartum Day:</span>
                            <span className="font-medium">21</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium text-blue-600">email@example.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Phone no:</span>
                            <span className="font-medium">0801 234 5678</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Pregnancy Status:</span>
                            <span className="font-medium">Postpartum</span>
                        </div>
                    </div>
                </div>

                {/* Session Summary & Notes */}
                <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Session Summary & Notes</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...
                    </p>
                </div>

                {/* Attachments & Reports */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Attachments & Reports</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Prescription Document</span>
                            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                                Download
                            </Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Test Results</span>
                            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                                View/Download
                            </Button>
                        </div>
                        <div className="mb-4">
                            <span className="text-sm text-gray-700 block mb-2">Full Medical Report</span>
                        </div>
                        <Button className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200">
                            Download Consolidated PDF
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Assigned Provider & Timeline */}
            <div className="flex-1 rounded-r-lg w-full bg-white">
                {/* Assigned Provider */}
                <div className=" p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Assigned Provider</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="/api/placeholder/48/48" alt="Dr. Evelyn Reed" />
                                <AvatarFallback className="bg-gray-200 text-gray-700">
                                    ER
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold text-gray-900">Dr. Evelyn Reed</h4>
                                <p className="text-sm text-gray-500">Self</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            View
                        </Button>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className=" p-6">
                    <h3 className="font-semibold text-gray-900 mb-6">Status Timeline</h3>
                    <div className="space-y-6">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                                        {event.icon}
                                    </div>
                                    {index < timelineEvents.length - 1 && (
                                        <div className="w-px h-12 bg-gray-200 mt-2"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-8">
                                    <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                                    {event.description && (
                                        <p className="text-sm text-gray-600">{event.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CaseDetailsView;