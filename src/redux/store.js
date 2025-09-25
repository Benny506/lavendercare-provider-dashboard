import { configureStore } from '@reduxjs/toolkit'
import appLoadingSlice from './slices/appLoadingSlice'
import userDetailsSlice from './slices/userDetailsSlice'
import notificationSlice from './slices/notificationSlice'
import messagesSlice from './slices/messagesSlice'

const store = configureStore({
    reducer: {
        appLoadingSlice,
        userDetailsSlice,
        notificationSlice,
        messagesSlice
    }
})

export default store