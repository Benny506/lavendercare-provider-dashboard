import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'

const notifications = [
  {
    iconBg: "bg-[#F0F5EA]",
    iconColor: "#669F2A",
    icon: "mage:notification-bell",
    message: "2 new booking requests received",
    time: "5 min ago"
  },
  {
    iconBg: "bg-[#FEEFEA]",
    iconColor: "#F7654A",
    icon: "icon-park-outline:caution",
    message: "1 high-risk screening submitted by Ngozi",
    time: "20 min ago"
  },
  {
    iconBg: "bg-[#F2F2F2]",
    iconColor: "#333333",
    icon: "material-symbols-light:check-rounded",
    message: "Consultation #458 assigned to you",
    time: "1 h ago"
  },
];

const sessions = [
  {
    time: "10 AM, Jul 8",
    name: "Chinenye Okeke",
    type: "Medical Consultation",
  },
  {
    time: "2 PM, Jul 9",
    name: "Fatima Musa",
    type: "Physical Recovery",
  },
  {
    time: "11 AM, Jul 10",
    name: "Kemi Alade",
    type: "Mental Health Support",
  },
];

const Overview = () => {
  return (
    <div>
      <TopDivider />

      {/* Quick Actions */}
      <div className="flex w-full justify-between items-center">
        <p className='font-bold text-lg'>Quick Action</p>
        <div className="flex gap-4 justify-end mb-6 ">
          <Button className="rounded-3xl px-6 py-6 bg-white text-black font-extrabold cursor-pointer">Set Availability</Button>
          <Button className="rounded-3xl px-6 py-6 bg-primary-600 font-extrabold text-white cursor-pointer">
            View Caseload
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {/* Card 1 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">New Consultations</p>
          <div className="flex items-start gap-4 py-4">
            <hr className='h-2 w-4 bg-black my-4' />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl text-[#4CAEA0]" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Upcoming Sessions</p>
          <div className="flex items-start gap-4 py-4">
            <hr className='h-2 w-4 bg-black my-4' />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl text-[#4CAEA0]" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">High-Risk Alerts</p>
          <div className="flex items-start gap-4 py-4">
            <hr className='h-2 w-4 bg-black my-4' />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl text-[#4CAEA0]" />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div>
        <p className='font-bold text-lg'>Notifications</p>

        <div className="bg-white rounded-xl p-6 mt-4">
          <div className='flex flex-col'>
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-6">No Notification found</p>
            ) : (
              <>
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 mb-4 last:mb-0 pb-2 last:pb-0"
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${notification.iconBg}`}>
                      <Icon icon={notification.icon} width="24" height="24" style={{ color: notification.iconColor }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
                <button className="text-start text-[#8B8B8A] text-sm mt-2 cursor-pointer">
                  View All Notifications
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="mt-6">
        <p className='font-bold text-lg'>Upcoming Sessions</p>

        <div className="bg-white rounded-xl p-6 mt-4">
          <div className="flex flex-col">
            {sessions.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-6">No Session found</p>
            ) : (
              <>
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold">
                        {session.time} <span className="font-normal">{session.name}</span>
                      </p>
                      <p className="text-xs text-gray-500">{session.type}</p>
                    </div>
                    <button className="px-5 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      View
                    </button>
                  </div>
                ))}
                <button className="text-start text-[#8B8B8A] text-sm mt-2 cursor-pointer">
                  View All Sessions
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
