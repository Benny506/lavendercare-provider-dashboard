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
    const loadMoreBookings = async ({ callBack=()=>{} }) => {
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
    const loadMoreScreenings = async ({ callBack=() => {} }) => {
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


    return {
        loadMoreBookings,
        loadMoreScreenings
    }
}