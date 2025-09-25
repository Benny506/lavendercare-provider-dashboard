import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile, Mic, ClockFading, MessageCircleWarning, Check, CheckCheck, RotateCw } from "lucide-react";
import TopDivider from "@/components/TopDivider";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import ProfileImg from "@/components/ui/ProfileImg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDirectChat } from "@/hooks/chatHooks/useDirectChat";
import { dmTopic } from "@/hooks/chatHooks/dm";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDate1, formatTimeToHHMMSS, isoToAMPM, isoToDateTime, timeToAMPM_FromHour, timeToAMPM_FromHour_Duration } from "@/lib/utils";
import PatientInfoModal from "./auxiliary/PatientInfoModal";
import { useCountdown } from "@/hooks/useCountdown";
import SummaryNotesModal from "./auxiliary/SummaryNotesModal";
import supabase from "@/database/dbInit";
import { sendNotifications } from '@/lib/notifications'
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";



export default function ActiveConsultation() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const bookings = useSelector(state => getUserDetailsState(state).bookings)
    const profile = useSelector(state => getUserDetailsState(state).profile)

    const topRef = useRef()
    const bottomRef = useRef(null)

    const { state } = useLocation()

    const selectedChat = bookings.filter(b => b.user_profile?.id == state?.user_id)[0]
    const meId = profile?.id
    const peerId = selectedChat?.user_profile?.id    

    const [input, setInput] = useState("");
    const [showPatientInfo, setShowPatientInfo] = useState(false);  
    const [showSummaryNotesModal, setShowSummaryNotesModal] = useState(false);  
    const [showSessionEndedModal, setShowSessionEndedModal] = useState(false);  
    const [summaryNote, setSummaryNote] = useState('')    

    const { 
        status, messages, sendMessage, onlineUsers, insertSubStatus, updateSubStatus,
        canLoadMoreMsgs, loadMessages, bulkMsgsRead, refreshConnection
    } = useDirectChat({ topic: selectedChat?.id, meId, peerId });

    const {
        remaining
    } = useCountdown({ startHour: selectedChat?.hour, durationInSeconds: selectedChat?.duration, day: new Date(selectedChat?.day) })

    const peerOnline = onlineUsers.includes(peerId)

    useEffect(() => {
        if(!selectedChat){
            toast.info("Unable to locate active booking")
            navigate('/individual/dashboard/consultation')

            return;
        
        }

        const booking_id = localStorage.getItem('booking_id')

        if(booking_id == selectedChat?.id){
            const summary_note = localStorage.getItem('summary_note')

            setSummaryNote(summary_note)
        }               
    }, [])

    useEffect(() => {
        if (messages?.length > 0) {
            console.log("RUNNING")
            bottomRef?.current?.scrollIntoView({ behaviour: 'smooth' })

            handleReadUnreadMsgs()           
        }
    }, [messages]);    
    
    // useEffect(() => {
    //     if(remaining <= 0){
    //         console.log("Session ended!!!")
    //         setShowSessionEndedModal(true)
    //     }
    // }, [remaining])

    if(!selectedChat){
        return <></>
    }

    const { 
        user_profile, duration, 
        hour, 
        day 
    } = selectedChat

    const handleReadUnreadMsgs = () => {
        const unReadMsgsIds = (messages || [])?.filter(msg => (!msg?.read_at && msg?.to_user === meId)).map(msg => msg?.id)

        bulkMsgsRead(unReadMsgsIds)        
    }  
    
    const loadMoreMessages = async () => {
        try {
            dispatch(appLoadStart())

            const lastMsg = messages[0]
            const last_loaded_at = lastMsg?.created_at

            await loadMessages({ msgLoadedTimeStamp: new Date().toISOString(), last_loaded_at, isOlder: true })

            const scrollToTopDelay = setTimeout(() => {
                // console.log("RUNNING")
                topRef?.current?.scrollIntoView({ behaviour: 'smooth' })
                clearTimeout(scrollToTopDelay)
            }, 0)
                        
        } catch (error) {
            console.warn(error)
            toast.error('Error retrieving messages')

        } finally{
            dispatch(appLoadStop())
        }
    }       

    const updateStatusToAwaitingCompletion = async () => {
        try {

            await supabase
                .from('bookings')
                .update({
                    status: 'awaiting_completion'
                })
                .eq("id", selectedChat?.id)

        } catch (error) {
            console.log(error)
            toast.error("Error updating appointment status. Contact support after this session")
        }
    }

    const sendNow = () => {
        const myMessagesCount = (messages || []).filter(msg => msg.from_user == meId).length 

        if(myMessagesCount === 1){
            // On first msg, update the booking status to awaiting_completion
            updateStatusToAwaitingCompletion()
        }

        if (!input.trim()) return;
        sendMessage({ text: input.trim(), toUser: peerId, bookingId: selectedChat?.id });
        setInput('');
    };   

    const notifyMother = async () => {
        try {
            dispatch(appLoadStart())

            await sendNotifications({
                tokens: [userInfo?.notification_token],
                // sound: null,
                title: `Incoming message from lavendercare vendor provider`,
                body: `New message detected`,
                data: {}
            });    
            
            toast.success("Mother notified!")
                        
        } catch (error) {
            console.log(error)
            toast.error("Error notifying mother. Messages have been sent though, she can view them on her lavendercare app")
        
        } finally{
            dispatch(appLoadStop())
        }
    } 

    return (
        <div>
            <TopDivider />
            <div className="flex h-[80vh] bg-gray-50 rounded-2xl">
                {/* Left Panel - Message List */}

                {/* Middle Panel - Chat Area */}
                <div className="flex-1 bg-white flex flex-col">
                    {
                    selectedChat
                    ?
                        <>
                            {/* Chat Header */}
                            <div className="p-4 flex-wrap gap-2 border-b border-gray-200 flex justify-between items-center bg-white">
                                <div className="flex items-center gap-3">
                                    <ProfileImg 
                                        profile_img={user_profile?.profile_img}
                                        name={user_profile?.name}
                                    />
                                    <div>
                                        <h2 className="font-semibold text-gray-900">{user_profile?.name}</h2>
                                        <p className="font-semibold text-xs text-primary-600 text-gray-900">
                                            {peerOnline ? 'online' : remaining <= 0 ? 'Session timer expired' : onlineUsers.length > 0 ? 'offline' : ''}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-center txt-13 text-gray-600">
                                        { formatDate1({ dateISO: new Date(day).toISOString() })}
                                    </p>
                                    <p className="text-center txt-15 text-gray-600">
                                        { timeToAMPM_FromHour({ hour }) } - { timeToAMPM_FromHour_Duration({ startHour: hour, durationInSeconds: duration }) }
                                    </p>
                                    <p className="text-center txt-16 text-gray-600">
                                        { formatTimeToHHMMSS({ secs: remaining }) }
                                    </p>                                    
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <button 
                                        onClick={notifyMother}
                                        className="text-sm bg-purple-600 hover:bg-purple-700 text-white cursor-pointer rounded-lg px-3 py-1"
                                    >
                                        Notify mother
                                    </button>                                    
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="text-white bg-primary-600"
                                        onClick={() => setShowSummaryNotesModal(true)}
                                    >
                                        Notes    
                                    </Button>                                

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-gray-600"
                                        onClick={() => setShowPatientInfo(true)}
                                    >
                                        View Info
                                    </Button>                                  
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <ScrollArea className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-4">
                                    {
                                        ['initial', ...messages].map((msg, i) => {

                                            if(msg === 'initial'){
                                                if(!canLoadMoreMsgs) {
                                                    return <></>
                                                }

                                                return (
                                                    <div
                                                        key={msg}
                                                        ref={topRef}
                                                        className="flex items-center justify-center my-2"
                                                    >
                                                        <div onClick={loadMoreMessages} className="cursor-pointer px-2 py-2 rounded-full bg-purple-600">
                                                            <RotateCw size={20} color="#FFF" />
                                                        </div>
                                                    </div>
                                                )
                                            }                                            

                                            const { message, from_user, pending, failed, created_at, read_at, delivered_at } = msg

                                            const iAmSender = from_user === meId ? true : false

                                            const seen = read_at ? true : false
                                            const delivered = delivered_at ? true : false

                                            return (
                                                <div key={msg.id} className={`flex ${iAmSender ? 'justify-end' : 'justify-start'}`}>
                                                    <div>
                                                        <div className={`max-w-xs ${iAmSender
                                                            ? 'bg-purple-600 text-white'
                                                            : 'bg-gray-100 text-gray-900'
                                                            } rounded-2xl px-4 py-3`}>
                                                            {msg.isVoice ? (
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                                        <Mic className="w-4 h-4" />
                                                                    </div>
                                                                    <div className="flex-1 h-2 bg-white bg-opacity-20 rounded-full">
                                                                        <div className="w-1/3 h-full bg-white rounded-full"></div>
                                                                    </div>
                                                                    <span className="text-xs opacity-75">0:15</span>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <p className="text-sm mb-3">{message}</p>

                                                                    <div className="flex flex-col items-end justify-end gap-">
                                                                        <p 
                                                                            style={{
                                                                                color: iAmSender ? '#FFF' : "_000"
                                                                            }}
                                                                            className="txt-10 m-0 p-0"
                                                                        >
                                                                            { isoToAMPM({ isoString: created_at }) }
                                                                        </p>

                                                                        {
                                                                            iAmSender
                                                                            &&
                                                                                (
                                                                                    seen
                                                                                    ?
                                                                                        <CheckCheck size={11} color="#FFF" />
                                                                                    :
                                                                                    delivered
                                                                                    &&
                                                                                        <Check size={11} color="#FFF" />
                                                                                )
                                                                        }
                                                                    </div>                                                                    
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-end">
                                                            {
                                                                pending
                                                                ?
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <ClockFading color="#6F3DCB" size={15} />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="top" sideOffset={5}>
                                                                            Pending message. Sending...
                                                                        </TooltipContent>
                                                                    </Tooltip>                                                                    
                                                                :
                                                                failed 
                                                                &&
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <MessageCircleWarning color="#c41a2b" size={15} />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="top" sideOffset={5}>
                                                                            Error sending message
                                                                        </TooltipContent>
                                                                    </Tooltip>                                                                
                                                            }                                                    
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }  

                                    {/* Bottom Ref  */}
                                    <div ref={bottomRef} />                                                                     
                                </div>                                                                
                            </ScrollArea>                          

                            {/* Message Input */}
                            {
                                (remaining > 0)
                                ?
                                    (status == 'subscribed' && insertSubStatus == 'subscribed' && updateSubStatus == 'subscribed')
                                    ?
                                        <div className="p-4 border-t border-gray-200 bg-white">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 relative">
                                                    <textarea
                                                        value={input}
                                                        onChange={(e) => setInput(e.target.value)}
                                                        placeholder="Type a message..."
                                                        className="w-full px-3 py-1 rounded-md bg-gray-50 border-gray-200"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-gray-200"
                                                    >
                                                        <Smile className="w-4 h-4 text-gray-500" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-10 w-10 p-0 rounded-full hover:bg-gray-100"
                                                >
                                                    <Paperclip className="w-4 h-4 text-gray-500" />
                                                </Button>
                                                <Button
                                                    onClick={sendNow}
                                                    size="sm"
                                                    className="h-10 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                                                >
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    :
                                        <div className="flex items-center justify-center">
                                            <div
                                                onClick={refreshConnection}
                                                className="text-center font-medium bg-purple-600 text-white m-3 py-3 px-7 cursor-pointer rounded-lg"
                                            >
                                                Want to send a msg?
                                            </div>
                                        </div>
                                :
                                    <div />
                            }
                        </>
                    :
                        <div className="flex flex-col h-100 items-center justify-center">
                            <h1>
                                A chat shows here once you have selected it
                            </h1>
                        </div>
                    }
                </div>

                {/* Patient Info Modal */}
                <PatientInfoModal 
                    closeModal={() => setShowPatientInfo(false)}
                    visible={showPatientInfo}
                    patient={selectedChat?.user_profile}
                />

                {/* Summary note modal  */}
                <SummaryNotesModal 
                    closeModal={() => setShowSummaryNotesModal(false)}
                    visible={showSummaryNotesModal}
                    booking={selectedChat}
                />

                {/* Session ended modal  */}
                {/* <SessionEndedModal 
                    closeModal={() => setShowSessionEndedModal(false)}
                    booking_id={selectedChat?.id}
                    visible={showSessionEndedModal}
                    summaryNote={summaryNote}
                /> */}
            </div>
        </div>
    );
}       