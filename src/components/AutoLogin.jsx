import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppLoading from "./appLoading/AppLoading"
import { useDispatch } from "react-redux"
import { setUserDetails } from "@/redux/slices/userDetailsSlice"
import supabase, { getIndividualProviderDetails } from "@/database/dbInit"

export default function AutoLogin({ children }){
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [appLoading, setAppLoading] = useState(true)

    // 1. Restore session & subscribe to auth changes
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if(session?.user){
                setUser(session?.user)
            
            } else{
                autoLoginError()
            }
        })

        // const { subscription } = supabase.auth.onAuthStateChange(
        //     (_event, session) => {
        //         setSession(session)
        //     }
        // )

        // return () => subscription.unsubscribe()

    }, [])

    // 2. Fetch related data once we have the user
    useEffect(() => {
        if (!user) return;

        async function loadProfile() {

            const { data: infoData, error: infoError } = await getIndividualProviderDetails({ id: user.id })

            if (infoError) {
                autoLoginError()
                console.error('Error loading profile:', infoError)

            } else {
                dispatch(setUserDetails({
                    profile: {
                        ...user,
                        ...infoData.profile
                    },
                    availability: infoData.availability,
                    bookingCostData: infoData.bookingCostData,
                    bookings: infoData.bookings,
                    screenings: infoData.screenings
                }))
                setAppLoading(false)
            }
        }

        loadProfile()
    }, [user]) 
    
    const autoLoginError = () => {
        navigate('/')
        setAppLoading(false)

        console.log("Auto-login failure")

        return;
    }

    if(appLoading) return <AppLoading tempLoading={true} />

    return (
        <div>
            { children }
        </div>
    )
}