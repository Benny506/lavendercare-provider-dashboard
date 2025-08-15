import { configureStore } from '@reduxjs/toolkit'
import appLoadingSlice from './slices/appLoadingSlice'
import userDetailsSlice from './slices/userDetailsSlice'
import notificationSlice from './slices/notificationSlice'

const store = configureStore({
    reducer: {
        appLoadingSlice,
        userDetailsSlice,
        notificationSlice
    }
})

export default store