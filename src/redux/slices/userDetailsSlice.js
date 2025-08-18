import { sortByDate, sortByHour, sortByTimeStamp } from "@/lib/utils"
import { getAppointmentStatus, sortByStatusPriority } from "@/lib/utilsJsx"
import { createSlice } from "@reduxjs/toolkit"

export const specializations = [
    "Obstetrics",
    "Mental Health Support",
    "Physical Recovery",
    "Pelvic Health",
    "Maternal Mental Health",
    "Lactation Support",
    "Family Planning",
    "Fertility Support",
    "Postpartum Doula Services",
];

const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        dailyLogs: [],
        profile: null,
        session: null,
        availability: [],
        bookingCostData: [],
        bookings: [],
        screenings: [],
        highRiskAlerts: []
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
                const bookingsWithCorrectStatus = (action.payload?.bookings || []).map(b => {
                    const { status, hour, duration, day } = b

                    const date_ISO = new Date(day).toISOString()

                    const computedStatus = getAppointmentStatus({ status, date_ISO, startHour: hour, duration_secs: duration })

                    return {
                        ...b,
                        status: computedStatus
                    }
                })

                const sortedWithPriority = sortByStatusPriority(bookingsWithCorrectStatus)

                state.bookings = sortedWithPriority
            } 
            
            if(action.payload?.screenings){
                state.screenings = action.payload?.screenings
            } 
            
            if(action?.payload?.highRiskAlerts){
                state.highRiskAlerts = action.payload?.highRiskAlerts
            }
        },

        clearUserDetails: (state, action) => {
            state.dailyLogs = []
            state.profile = null
            state.session = null
            state.availability = []
            state.bookingCostData = []
            state.bookings = []
            state.screenings = []
            state.highRiskAlerts = []
        }
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer