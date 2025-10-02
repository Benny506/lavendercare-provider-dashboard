import TopDivider from "@/components/TopDivider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ErrorMsg2 from "@/components/ui/ErrorMsg2";
import ProfileImg from "@/components/ui/ProfileImg";
import ZeroItems from "@/components/ui/ZeroItems";
import { getStatusBadge } from "@/lib/utilsJsx";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import { Calendar, Bookmark, CheckCircle, FileText, Stethoscope, MessageCircleWarning, X, Ellipsis, FileWarning } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PatientInfo from "../screenings/auxiliary/PatientInfo";
import { useReactToPrint } from "react-to-print";
import { formatDate1, formatTo12Hour, isoToDateTime, secondsToLabel, timeToAMPM_FromHour } from "@/lib/utils";

const CaseDetailsView = () => {

    const navigate = useNavigate()

    const { state } = useLocation() 
    const booking_id = state?.booking_id

    const bookings = useSelector(state => getUserDetailsState(state).bookings)
    const screenings = useSelector(state => getUserDetailsState(state).screenings)

    const containerRef = useRef(null)

    const downloadEntireDoc = useReactToPrint({
        contentRef: containerRef
    });            

    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
    const [singleBooking, setSingleBooking] = useState()

    useEffect(() => {
        if(!booking_id){
            navigate('/individual/dashboard/caseload')
        
        } else {

            const booking = (bookings || []).filter(s => s.id == booking_id)[0]

            if(booking){
                setSingleBooking(booking)
            
            } else{
                setApiReqs({ isLoading: false, errorMsg: "Error fetching single booking information"})
            }
        }
    }, [bookings])

    if(apiReqs.errorMsg){
        if(bookings?.length > 0){
            return (
                <div
                    style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', gap: '15px',
                        height: '100%', flexGrow: 1                        
                    }}                    
                >
                    <ZeroItems zeroText={'No case load found'} />
                </div>
            )
        }

        return(
            <ErrorMsg2 
                errorMsg={apiReqs.errorMsg}
            />
        )
    }

    if(!booking_id || !singleBooking) return <></>  
    
    const { user_profile } = singleBooking

    const patientScreening = (screenings || []).filter(s => s.user_id == user_profile?.id)

    const timelineEvents = [
        {
            icon: <Calendar className="w-5 h-5 text-blue-500" />,
            title: "Consultation preview",
            description: singleBooking?.booking_brief || "Not set",
            type: "consultation"
        },
        {
            icon: <Bookmark className="w-5 h-5 text-green-500" />,
            title: `Booking created on - ${isoToDateTime({ isoString: singleBooking?.created_at })}`,
            description: "",
            type: "booking"
        },        
        {
            icon: <Bookmark className="w-5 h-5 text-green-500" />,
            title: `Booking set for: ${formatDate1({ dateISO: new Date(singleBooking?.day).toISOString() })} by ${formatTo12Hour({ time: singleBooking?.start_time })}. Duration: ${secondsToLabel({ seconds: singleBooking?.duration })}`,
            description: "",
            type: "booking"
        },
        {
            icon: patientScreening[0] ? <CheckCircle className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />,
            title: "Last screen date",
            description: patientScreening[0] ? formatDate1({ dateISO: new Date(patientScreening[0].test_date).toISOString() }) : "Not screened before",
            type: "screening"
        },
        ...(
            (singleBooking?.status == 'ongoing' || singleBooking?.status == 'new')
            ? 
                [
                    {
                        icon: <Ellipsis className="w-5 h-5 text-green-500" />,
                        title: "Pending",
                        description: "Available for completed sessioons",
                        type: "pending"                    
                    }
                ] 
            : 
                [
                    {
                        icon: singleBooking?.prescription_note ? <FileText className="w-5 h-5 text-blue-500" /> : <FileWarning className="w-5 h-5 text-red-500" />,
                        title: "Prescription Issued",
                        description: singleBooking?.prescription_note || "Not set",
                        type: "prescription"
                    },
                    {
                        icon: singleBooking?.summary_note ? <FileText className="w-5 h-5 text-gray-500" /> : <MessageCircleWarning className="w-5 h-5 text-red-500" />,
                        title: "Therapy Notes Added",
                        description: singleBooking?.summary_note || 'Not set',
                        type: "notes"
                    },
                ]
        ),
    ];    

    return (
        <div className="md:p-6 min-h-screen">
            <TopDivider />
            
            {/* Wrap both panels */}
            <div ref={containerRef} className="flex flex-col lg:flex-row">

                {/* Left Panel */}
                <div className="w-full lg:max-w-xs h-max bg-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none p-6 border-b lg:border-b-0 lg:border-r border-gray-200 shadow-sm">
                    {/* Patient Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <ProfileImg 
                            profile_img={user_profile?.profile_img}
                            name={user_profile?.name}
                            width={'100px'}
                            height={'100px'}
                            containerClass={"w-16 h-16"}
                            textClass={'text-2xl'}
                        />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{user_profile?.name}</h2>
                            <p className="text-gray-500 text-sm">Case ID : {singleBooking?.id}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        { getStatusBadge(singleBooking?.status) }
                    </div>

                    {/* Patient Information */}
                    <PatientInfo 
                        patient={user_profile}
                    />

                    {/* Session Summary & Notes */}
                    <div className="mb-8">
                        <h3 className="font-semibold text-gray-900 mb-4">Session Summary & Notes</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {
                                singleBooking?.status == 'new' || singleBooking?.status == 'ongoing'
                                ?
                                    `Available for completed sessions`
                                :
                                    singleBooking?.summary_note || "Not set"
                            }
                        </p>                       
                    </div>

                    {/* Attachments & Reports */}

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Attachments & Reports</h3>
                        {
                            (singleBooking?.status == 'new' || singleBooking?.status == 'ongoing')
                            ?
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Available for completed sessions
                                </p>
                            :
                                <div>
                                    <div className="space-y-3">
                                        {/* <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Prescription Document</span>
                                            {
                                                singleBooking?.prescription_doc
                                                ?
                                                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                                                        Download
                                                    </Button>
                                                :
                                                    <span className="text-sm text-gray-600 leading-relaxed">
                                                        Not set
                                                    </span>                                     
                                            }
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Test Results</span>
                                            {
                                                singleBooking?.test_results
                                                ?
                                                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                                                        Download
                                                    </Button>
                                                :
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        Not set
                                                    </p>                                     
                                            }                                        
                                        </div> */}
                                        <Button onClick={downloadEntireDoc} className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200">
                                            Download Consolidated PDF
                                        </Button>

                                        <Button variant={'default'} onClick={() => navigate('/individual/dashboard/consultation/chat', { state: { user_id: user_profile?.id } })} className="w-full bg-primary-600 text-white hover:bg-purple-600">
                                            View chat messages
                                        </Button>                                        
                                    </div>
                                </div>
                        }
                    </div>
                </div>

                {/* Right Panel - Assigned Provider & Timeline */}
                <div className="flex-1 rounded-r-lg w-full bg-white">
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