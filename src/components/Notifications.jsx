
import { isoToTimeAgo } from "@/lib/utils"
import { getNotificationIcon } from "@/lib/utilsJsx"
import { getNotificationState } from "@/redux/slices/notificationSlice"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Notifications({ count }){

    const notifications = useSelector(state => getNotificationState(state).notifications)

    const slicedNotifications = (notifications || []).slice(0, count || notifications?.length)

    return(
        <>
            {
                slicedNotifications?.map((n, i) => {
                    const { type, message, created_at } = n

                    return(
                        <div
                            key={i}
                            className="flex items-center gap-4 mb-4 last:mb-0 pb-2 last:pb-0"
                        >
                            { getNotificationIcon({ type }) }

                            <div className="flex-1">
                                <p className="text-sm font-medium">{message}</p>
                                <p className="text-xs text-gray-500">{isoToTimeAgo({ isoString: created_at })}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}