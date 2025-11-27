import supabase from "@/database/dbInit";
import { removeDuplicatesFromStringArr } from "@/lib/utils";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";
import { getUserDetailsState, setUserDetails } from "@/redux/slices/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useApiReqs() {
    const dispatch = useDispatch()

    const profile = useSelector(state => getUserDetailsState(state).profile)
    const allBookings = useSelector(state => getUserDetailsState(state).bookings)
    const allScreenings = useSelector(state => getUserDetailsState(state).screenings)





    //bookings
    const loadMoreBookings = async ({ callBack = () => { } }) => {
        try {

            dispatch(appLoadStart())

            const limit = 100;
            const from = (allBookings?.length || 0); // start from current length
            const to = from + limit - 1;

            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    user_profile:user_profiles (*)
                `)
                .eq("provider_id", profile?.provider_id)
                .order("day", { ascending: false, nullsFirst: false })
                .order('hour', { ascending: false, nullsFirst: false })
                .limit(limit)
                .range(from, to);

            if (error) {
                console.warn(error)
                throw new Error()
            }

            if (data.length === 0) {
                toast.info("All bookings loaded")
                callBack({ canLoadMore: false })
            }

            dispatch(setUserDetails({
                bookings: [...(allBookings || []), ...data]
            }))

        } catch (error) {
            console.error(error)
            toast.error("Error loading more bookings")

        } finally {
            dispatch(appLoadStop())
        }
    }





    //screenings
    const loadMoreScreenings = async ({ callBack = () => { } }) => {
        try {
            dispatch(appLoadStart())

            const bookings_userIds = removeDuplicatesFromStringArr({ arr: allBookings.map(b => b?.user_profile?.id) })

            const limit = 100;
            const from = (allScreenings?.length || 0); // start from current length
            const to = from + limit - 1;

            const { data, error } = await supabase
                .from('mental_health_test_answers')
                .select(`
                    *,
                    user_profile:user_profiles (*)      
                `)
                .in('user_id', bookings_userIds)
                .order("created_at", { ascending: false, nullsFirst: false })
                .limit(limit)
                .range(from, to);

            if (error) {
                console.warn(error)
                throw new Error()
            }

            if (data.length === 0) {
                toast.info("All screenings loaded")
                callBack({ canLoadMore: false })
            }

            dispatch(setUserDetails({
                screenings: [...(allScreenings || []), ...data]
            }))

        } catch (error) {
            console.error(error)
            toast.error("Error loading more screenings")

        } finally {
            dispatch(appLoadStop())
        }
    }





    //specialties
    const fetchSpecialties = async ({ callBack = () => { } }) => {
        try {

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from('provider_specialties')
                .select("*")

            if (error) {
                console.log(error)
                throw new Error()
            }

            callBack && callBack({ specialties: data })

        } catch (error) {
            console.error(error)
            toast.error("Error fetching specialties")

        } finally {
            dispatch(appLoadStop())
        }
    }





    //availability
    const deleteConsultationType = async ({ callBack = () => {}, type_id }) => {
        try {

            if (!type_id) throw new Error();

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from("consultation_types")
                .delete()
                .eq("id", type_id)

            if (error) {
                console.log(error)
                throw new Error()
            }

            const updatedProfile = {
                ...(profile || {}),
                consultation_types: (profile?.consultation_types || [])?.filter(t => t?.id !== type_id)
            }

            dispatch(setUserDetails({
                profile: updatedProfile 
            }))

            dispatch(appLoadStop())

            callBack && callBack({ deleted_type_id: type_id })

            toast.success("Consultation info saved")

        } catch (error) {
            console.log(error)
            apiReqError({ errorMsg: 'Something went wrong! Try again' })
        }
    }

    const updateConsultationType = async ({ callBack = () => {}, update, type_id }) => {
        try {

            if (!update || !type_id) throw new Error();

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from("consultation_types")
                .update(update)
                .eq("id", type_id)
                .select()
                .single()

            if (error) {
                console.log(error)
                if (error.message?.toLowerCase().includes("duplicate key")) return apiReqError({ errorMsg: 'Session with this duration already exists for this service' });
                throw new Error()
            }

            const updatedProfile = {
                ...(profile || {}),
                consultation_types: (profile?.consultation_types || [])?.map(t => {
                    if (t?.id === type_id) {
                        return data
                    }

                    return t
                })
            }

            dispatch(setUserDetails({ profile: updatedProfile }))

            dispatch(appLoadStop())

            callBack && callBack({ updatedType: data })

            toast.success("Consultation info saved")

        } catch (error) {
            console.log(error)
            apiReqError({ errorMsg: 'Something went wrong! Try again' })
        }
    }

    const insertConsultationType = async ({ callBack = () => {}, requestInfo }) => {
        try {

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from("consultation_types")
                .insert(requestInfo)
                .select()
                .single()

            if (error) {
                console.log(error)
                if (error.message?.toLowerCase().includes("duplicate key")) return apiReqError({ errorMsg: 'Session with this duration already exists for this service' });
                throw new Error()
            }

            const updatedProfile = {
                ...(profile || {}),
                consultation_types: [data, ...(profile?.consultation_types || [])]
            }
            
            dispatch(setUserDetails({ profile: updatedProfile }))

            dispatch(appLoadStop())

            callBack && callBack({ newType: data })

            toast.success("Session info saved")

        } catch (error) {
            console.log(error)
            apiReqError({ errorMsg: 'Something went wrong! Try again' })
        }
    }





    const apiReqError = ({ errorMsg }) => {
        toast.error(errorMsg)
        dispatch(appLoadStop())
    }





    return {
        //bookings
        loadMoreBookings,





        //screening
        loadMoreScreenings,





        //specialties
        fetchSpecialties,





        //availability
        insertConsultationType, 
        deleteConsultationType,
        updateConsultationType
    }
}