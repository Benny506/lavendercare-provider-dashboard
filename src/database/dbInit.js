import { generateNumericCode, removeDuplicatesFromStringArr } from '@/lib/utils'
import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://tzsbbbxpdlupybfrgdbs.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6c2JiYnhwZGx1cHliZnJnZGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzU0MTEsImV4cCI6MjA2NzU1MTQxMX0.3MPot37N05kaUG8W84JItSKgH2bymVBee1MxJ905XEk'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    realtime: { params: { eventsPerSecond: 10 } },
    debug: true // This will print realtime connection logs
})

export default supabase





//LOGIN
export async function individualProviderLogin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { errorMsg: error.message, data: null };
  
  const { data: infoData, error: infoError } = await getIndividualProviderDetails({ id: data.user.id })

  if(infoError || !infoData) return { errorMsg: "Error getting provider information", data: null };

  return {
    data: {
        user: data?.user,
        session: data?.session,
        ...infoData,    
    },
    errorMsg: null 
  }
}
export async function getIndividualProviderDetails({ id }){
  const { data: profileData, error: profileError } = await supabase
    .from("provider_profiles")
    .select(`
      *,
      consultation_types ( * )   
    `)
    .eq('provider_id', id) 
    .single();  

  const { data: bookingsData, error: bookingsError } = await supabase
    .from('all_bookings')
    .select(`
      *,
      user_profile:user_profiles (*)
    `)    
    .eq("provider_id", id)  
    .order("day", { ascending: false, nullsFirst: false })      
    .order('start_time', { ascending: false, nullsFirst: false })
    .limit(1000)

  if(profileError || bookingsError) {
    console.log(profileError)
    console.log(bookingsError)
    return { error: "Error getting provider profile", data: null };
  }

  const bookings_userIds = removeDuplicatesFromStringArr({ arr: bookingsData.map(b => b?.user_profile?.id) })

  const { data: screeningsData, error: screeningsError } = await supabase
    .from('mental_health_test_answers')
    .select(`
      *,
      user_profile:user_profiles (*)      
    `)
    .in('user_id', bookings_userIds) 
    .order("created_at", { ascending: false, nullsFirst: false }) 
    .limit(1000)
  
  const orString = `to_id.eq.${id}, and(from_id.in.(${bookings_userIds}), type.eq.screening)`

  const { data: notificationsData, error: notificationsError } = await supabase
    .from('notifications')
    .select('*')
    .or(orString)
    .order("created_at", { ascending: false, nullsFirst: false }) 
    .limit(1000)

  const { data: highRiskAlertsData, error: highRiskAlertsError } = await supabase
    .from('high_risk_alerts')
    .select('*')
    .in('user_id', bookings_userIds)
    .order("created_at", { ascending: false, nullsFirst: false }) 
    .limit(1000)
  
  if(screeningsError || notificationsError || highRiskAlertsError){
    console.log(screeningsError)
    console.log(notificationsError)
    console.log(highRiskAlertsError)
    return { error: "Error getting provider profile", data: null };
  }


  return{
    data: {
      profile: profileData,
      bookings: bookingsData,
      screenings: screeningsData,
      notifications: notificationsData,
      highRiskAlerts: highRiskAlertsData
    },
    error: null
  }
}






// OTP 
export async function createOrUpdateOtp({ email, requiresAuth }) {
    // 1. Check if user exists in auth.users
    const { data: userExistsData, error: existsError } = await supabase
        .rpc('user_exists', { email_input: email });

    const userAlreadyExists = userExistsData === true ? true : false

    if(requiresAuth){
        if(!userAlreadyExists){
            return { userAlreadyExists }
        }

    } else{
        if (userAlreadyExists) {
            return { userAlreadyExists };
        }
    }


    // 2. Generate 6-digit OTP
    const otp = generateNumericCode(6)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // 3. Upsert into otps
    const { error: otpError } = await supabase
        .from('otps')
        .upsert(
            {
                email,
                otp,
                expires_at: expiresAt,
            },
            { onConflict: ['email'] }
    );

    if (otpError) {
        console.log('Error upserting OTP:', otpError);

        if(requiresAuth){
            return { error: 'Error sending OTP to mail', userAlreadyExists }
        }

        return { error: 'Error sending OTP to mail' }
    }

    if(requiresAuth){
        return { token: { otp, expiresAt }, userAlreadyExists };
    }

    return { token: { otp, expiresAt } };
}
export async function validateOtp({ email, otp }) {
  const { data: isValid, error } = await supabase
    .rpc('validate_otp', { provider_email: email, provider_otp: otp });

  if (error) {
    console.error('OTP validation error:', error);
    throw error;
  }

  return isValid; // boolean
}