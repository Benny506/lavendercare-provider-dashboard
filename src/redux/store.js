import { configureStore } from '@reduxjs/toolkit'
import appLoadingSlice from './slices/appLoadingSlice'

const store = configureStore({
    reducer: {
        appLoadingSlice
    }
})

export default store