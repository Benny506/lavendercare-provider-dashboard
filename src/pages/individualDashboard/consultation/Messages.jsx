import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile, Mic } from "lucide-react";
import TopDivider from "@/components/TopDivider";
import { useSelector } from "react-redux";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import ProfileImg from "@/components/ui/ProfileImg";

const messagesData = [
  // { id: 1, name: "Chimeyue Okeke", message: "Hello, Good day", time: "10:20 AM", unread: true },
  // { id: 2, name: "Abisola Grace", message: "Hello dear", time: "10:30 AM", unread: false },
  // { id: 3, name: "Yinka Praise", message: "Hi there", time: "12:05 PM", unread: true },
  // { id: 4, name: "Chimeyue Okeke", message: "Test result is ready", time: "1:20 PM", unread: false },
  // { id: 5, name: "Yinka Praise", message: "Thank you doctor", time: "1:30 PM", unread: false },
  // { id: 5, name: "Yinka Praise", message: "Thank you doctor", time: "1:30 PM", unread: false },
  // { id: 5, name: "Yinka Praise", message: "Thank you doctor", time: "1:30 PM", unread: false },
  // { id: 5, name: "Yinka Praise", message: "Thank you doctor", time: "1:30 PM", unread: false },
  // { id: 5, name: "Yinka Praise", message: "Thank you doctor", time: "1:30 PM", unread: false },
];

const chatMessages = [
  // { id: 1, sender: "patient", message: "Hello, Good day", time: "10:20 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 2, sender: "doctor", message: "Approved report", time: "10:25 AM" },
  // { id: 3, sender: "doctor", message: "", time: "10:30 AM", isVoice: true },
];

export default function Messages() {

  const bookings = useSelector(state => getUserDetailsState(state).bookings)

  const [selectedChat, setSelectedChat] = useState();
  const [messageInput, setMessageInput] = useState("");
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  return (
    <div>
      <TopDivider />
      <div className="flex h-[80vh] bg-gray-50 rounded-2xl">
        {/* Left Panel - Message List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col rounded-l-2xl">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          </div>

          <div className="p-4">
            <Input
              placeholder="Search Direct Message"
              className="w-full rounded-full bg-gray-50 border-gray-200"
            />
          </div>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="px-2">
              {
                bookings.map((booking) => {

                  const { user_profile } = booking
                
                  return (
                    <div
                      key={booking.id}
                      onClick={() => setSelectedChat(booking)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 mb-1 ${selectedChat?.id === booking.id ? "bg-gray-200" : ""
                        }`}
                    >
                      <ProfileImg 
                        profile_img={user_profile?.profile_img}
                        name={user_profile?.name}
                      />

                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900 text-sm truncate">{user_profile?.name}</span>
                          {/* <span className="text-xs text-gray-500">{chat.time}</span> */}
                        </div>
                        {/* <p className="text-sm text-gray-600 truncate">{chat.message}</p> */}
                      </div>
                      {/* {chat.unread && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      )} */}
                    </div>
                  )})
              }
            </div>
          </ScrollArea>
        </div>

        {/* Middle Panel - Chat Area */}
        <div className="flex-1 bg-white flex flex-col">
          {
            selectedChat
            ?
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-3">
                    <ProfileImg 
                      profile_img={selectedChat?.user_profile?.profile_img}
                      name={selectedChat?.user_profile?.name}
                    />
                    <h2 className="font-semibold text-gray-900">{selectedChat?.user_profile?.name}</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600"
                    onClick={() => setShowPatientInfo(true)}
                  >
                    View Info
                  </Button>
                </div>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs ${msg.sender === 'doctor'
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
                            <p className="text-sm">{msg.message}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full rounded-full pr-12 bg-gray-50 border-gray-200"
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
                      size="sm"
                      className="h-10 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                    >
                      Send
                    </Button>
                  </div>
                </div>
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
        {showPatientInfo && (
        <div className="fixed inset-0 bg-opacity-30 z-50">
          <div className="absolute right-10 top-10 w-80 bg-white shadow-xl rounded-lg">
            {/* Patient Header */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/api/placeholder/64/64" 
                    alt="Patient" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Chinenye Okeke</h2>
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full mt-1">
                    New
                  </span>
                </div>
              </div>

              {/* Patient Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-500 w-32">Age:</span>
                    <span className="text-gray-900 font-medium">29</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Postpartum Day:</span>
                    <span className="text-gray-900 font-medium">21</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Contact:</span>
                    <span className="text-gray-900 font-medium">email@example.com</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Phone no</span>
                    <span className="text-gray-900 font-medium">0801 234 5678</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Pregnancy Status:</span>
                    <span className="text-gray-900 font-medium">Postpartum</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Attachments & Reports Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments & Reports</h3>
                
                {/* Upload Prescription */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-700">Upload Prescription</span>
                  <div className="w-5 h-5 rounded-full border-2 border-purple-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  </div>
                </div>

                {/* Empty space for uploaded files */}
                <div className="h-8 mb-6"></div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                    Request Test
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                    Refer Provider
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                    Download Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}