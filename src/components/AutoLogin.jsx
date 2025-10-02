import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppLoading from "./appLoading/AppLoading"
import { useDispatch } from "react-redux"
import { setUserDetails } from "@/redux/slices/userDetailsSlice"
import supabase, { getIndividualProviderDetails } from "@/database/dbInit"
import { setNotifications } from "@/redux/slices/notificationSlice"
import { toast } from "react-toastify"

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
                setSession(session)
            
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
        if (!user || !session) return;

        // console.log(user)

        async function loadProfile() {

            const { data: infoData, error: infoError } = await getIndividualProviderDetails({ id: user.id })

            if (infoError) {
                autoLoginError()
                console.error('Error loading profile:', infoError)

            } else {
                if(!infoData?.profile?.credentials_approved){
                    toast.info("Credentials submitted and are awaiting approval. We will reach out to you via email soon")
                    autoLoginError()

                    return;
                }

                dispatch(setUserDetails({
                    user,
                    session,
                    profile: {
                        ...infoData.profile
                    },
                    bookings: infoData.bookings,
                    screenings: infoData.screenings,
                    highRiskAlerts: infoData.highRiskAlerts
                }))

                dispatch(setNotifications({
                    notifications: infoData?.notifications
                }))

                setAppLoading(false)
            }
        }

        loadProfile()
    }, [user, session]) 
    
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