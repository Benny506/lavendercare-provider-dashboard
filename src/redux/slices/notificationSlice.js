import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: {
        notifications: []
    },
    reducers: {
        setNotifications: (state, action) => {
            if(action?.payload?.notifications){
                state.notifications = action?.payload?.notifications
            }
        }
    }
})

export const { setNotifications } = notificationSlice.actions

export const getNotificationState = state => state.notificationSlice

export default notificationSlice.reducer