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
        user: null,
        profile: null,
        session: null,
        bookings: [],
        screenings: [],
        highRiskAlerts: [],
        bank: null,
        phone_number: {
            phone_number: null,
            country_code: null
        }        
    },
    reducers: {
        setUserDetails: (state, action) => {
            if(action.payload?.user){
                state.user = action.payload.user
            } 

            if(action.payload?.session){
                state.session = action.payload.session
            }             

            if(action.payload?.profile){
                state.profile = action.payload.profile
            }

            if(action.payload?.bookings){
                const bookingsWithCorrectStatus = (action.payload?.bookings || []).map(b => {
                    const { status, start_time, duration, day } = b

                    const computedStatus = getAppointmentStatus({ status, start_time, duration_secs: duration })

                    return {
                        ...b,
                        status: computedStatus
                    }
                })

                // const sortedWithPriority = sortByStatusPriority(bookingsWithCorrectStatus)

                state.bookings = bookingsWithCorrectStatus
            } 
            
            if(action.payload?.screenings){
                state.screenings = action.payload?.screenings
            } 
            
            if(action?.payload?.highRiskAlerts){
                state.highRiskAlerts = action.payload?.highRiskAlerts
            }

            if(action?.payload?.bank){
                state.bank = action.payload?.bank
            }            

            if(action?.payload?.phone_number){
                const number = action?.payload?.phone_number 

                if(number?.phone_number && number?.country_code){
                    state.phone_number.country_code = number?.country_code
                    state.phone_number.phone_number = number?.phone_number
                }
            }              
        },

        clearUserDetails: (state, action) => {
            state.dailyLogs = []
            state.user = null
            state.profile = null
            state.session = null
            state.availability = []
            state.bookingCostData = []
            state.bookings = []
            state.screenings = []
            state.highRiskAlerts = [],
            state.phone_number = {
                phone_number: null,
                country_code: null                
            }
            state.bank = null
        }
    }
})

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions

export const getUserDetailsState = state => state.userDetailsSlice

export default userDetailsSlice.reducer