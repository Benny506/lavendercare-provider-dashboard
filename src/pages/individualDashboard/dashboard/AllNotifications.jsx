import Notifications from "@/components/Notifications"
import TopDivider from "@/components/TopDivider"
import ZeroItems from "@/components/ui/ZeroItems"
import { getNotificationState } from "@/redux/slices/notificationSlice"
import { useSelector } from "react-redux"

export default function AllNotifications(){

    const notifications = useSelector(state => getNotificationState(state).notifications)

    return (
      <div>
        <TopDivider />

        <p className='font-bold text-lg'>Notifications</p>

        <div className="bg-white rounded-xl p-6 mt-4">
          <div className='flex flex-col'>
            {notifications.length === 0 ? (
              <ZeroItems
                zeroText={'No Notifications found'}
              />
            ) : (
                <Notifications />
            )}
          </div>
        </div>
      </div>        
    )
}