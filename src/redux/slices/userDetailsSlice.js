import { sortByTimeStamp } from "@/lib/utils"
import { createSlice } from "@reduxjs/toolkit"

const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        dailyLogs: [],
        profile: null,
        session: null,
        availability: [],
        bookingCostData: [],
        bookings: [],
        screenings: []
    },
    reducers: {
        setUserDetails: (state, action) => {
            if(action.payload?.profile){
                state.profile = action.payload.profile
            }

            if(action.payload?.availability){
                state.availability = action.payload.availability
            }

            if(action.payload?.bookingCostData){
                state.bookingCostData = action.payload.bookingCostData
            }

            if(action.payload?.bookings){
                state.bookings = action.payload.bookings
            } 
            
            if(action.payload?.screenings){
                const orderedScreening = sortByTimeStamp({ 
                    arr: action.payload?.screenings,
                    key: 'created_at'
                })
                state.screenings = orderedScreening
            }             
        }
    }
})

export const { setUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer