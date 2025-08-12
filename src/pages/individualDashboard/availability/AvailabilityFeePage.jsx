import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import TopDivider from '@/components/TopDivider';
import { useDispatch, useSelector } from 'react-redux';
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice';
import { toast } from 'react-toastify';
import supabase from '@/database/dbInit';
import { getUserDetailsState, setUserDetails } from '@/redux/slices/userDetailsSlice';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup'
import ErrorMsg1 from '@/components/ErrorMsg1';
import { currencies, formatNumberWithCommas } from '@/lib/utils';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
];

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function parseScheduleKey(key) {
  const idx = key.indexOf('_')
  if (idx === -1) throw new Error(`Invalid key format: "${key}"`)

  const weekday = key.slice(0, idx).toLowerCase()
  const timePart = key.slice(idx + 1)   // e.g. "8:00 AM"

  const match = timePart.match(/^(\d{1,2}):\d{2}\s*(AM|PM)$/i)
  if (!match) throw new Error(`Invalid time format: "${timePart}"`)

  let hour = parseInt(match[1], 10)
  const period = match[2].toUpperCase()
  if (period === 'PM' && hour < 12) hour += 12
  if (period === 'AM' && hour === 12) hour = 0

  return { weekday, hour }
}

function groupSchedule(schedule) {
  const groups = {}

  // 1) Parse each key, collect hours per day
  Object.keys(schedule).forEach(key => {
    if (!schedule[key]) return
    const { weekday, hour } = parseScheduleKey(key)
    if (!groups[weekday]) groups[weekday] = []
    groups[weekday].push(hour)
  })

  // 2) Build final array, sorting hours and filtering out empty
  return Object.entries(groups)
    .map(([weekday, hours]) => ({
      weekday,
      hours: Array.from(new Set(hours))  // remove duplicates
        .sort((a, b) => a - b)
    }))
    .filter(group => group.hours.length > 0)
}

function flattenAvailability(availabilityArray = []) {
  const result = {}

  availabilityArray.forEach(({ weekday, hours }) => {
    hours.forEach(hour => {
      const isPM = hour >= 12
      const hour12 = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)
      const suffix = isPM ? 'PM' : 'AM'
      const timeString = `${hour12}:00 ${suffix}`

      const key = `${weekday}_${timeString}`
      result[key] = true
    })
  })

  return result
}




export default function AvailabilityFeePage() {
  const dispatch = useDispatch()

  const userProfile = useSelector(state => getUserDetailsState(state).profile)
  const userAvailability = useSelector(state => getUserDetailsState(state).availability)
  const bookingCostData = useSelector(state => getUserDetailsState(state).bookingCostData)

  const [availability, setAvailability] = useState(flattenAvailability(userAvailability));
  const [success, setSuccess] = useState(false);
  const [groupedAvailability, setGroupedAvailability] = useState([])
  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
  const [bookingCostOpts, setBookingCostOpts] = useState({
    '15': null, '30': null, '45': null, '60': null, currency: ''
  })

  useEffect(() => {
    const { isLoading, errorMsg } = apiReqs

    if(isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop())

  }, [apiReqs])

  useEffect(() => {
    if(availability){
      setGroupedAvailability(groupSchedule(availability))
    }
  }, [availability])

  useEffect(() => {
    if(bookingCostData){
      const opts = {...bookingCostOpts}

      for(let i = 0; i < bookingCostData.length; i++){
        const { price, duration_secs, currency } = bookingCostData[i]

        const durationMin = duration_secs / 60

        opts[durationMin] = price
        opts.currency = currency
      }       

      setBookingCostOpts(opts)
    }
  }, [bookingCostData])

  const toggleAvailability = (day, time) => {
    const key = `${day}_${time}`;
    setAvailability(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    try {
      setApiReqs({ isLoading: true, errorMsg: null })

      const { data, error } = await supabase
        .from('provider_availability')
        .upsert(
          groupedAvailability.map(a => ({ ...a, provider_id: userProfile.id })),
          {
            onConflict: ['provider_id', 'weekday']
          }
        )
        .select('*')
      
      if(!data || error){
        console.log(error, error.message)
        throw new Error()
      }

      dispatch(setUserDetails({
        availability: data
      }))

      setApiReqs({ isLoading: false, errorMsg: null })
      setSuccess(true);
      toast.success("Availability settings saved")
            
    } catch (error) {
      console.log(error)
      return saveError({ errorMsg: 'Error saving availability settings!' })  
    }
  };

  const handlePriceSave = async ({ requestBody }) => {
    try {
      setApiReqs({ isLoading: true, errorMsg: null })

      const { data, error } = await supabase
        .from('provider_booking_cost_options')
        .upsert(
          requestBody,
          {
            onConflict: ['provider_id', 'duration_secs', "price"]
          }
        )
        .select('*')
      
      if(!data || error){
        console.log(error, error.message)
        throw new Error()
      }

      dispatch(setUserDetails({
        bookingCostData: data
      }))

      setApiReqs({ isLoading: false, errorMsg: null })
      setSuccess(true);
      toast.success("Fees settings saved")
            
    } catch (error) {
      console.log(error)
      return saveError({ errorMsg: 'Error saving fees settings!' })  
    }
  }

  const saveError = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg })
    toast.error(errorMsg)

    return
  }

  const validationSchema = yup
    .object()
    .shape({
      currency: yup
        .string()
        .required("Currency is required"),

      _15_min_price: yup
        .number()
        .min(1, "Cannot be less than 1")
        .typeError("Must contain only digits")
        .nullable(),

      _30_min_price: yup
        .number()
        .min(1, "Cannot be less than 1")
        .typeError("Must contain only digits")
        .nullable(),

      _45_min_price: yup
        .number()
        .min(1, "Cannot be less than 1")
        .typeError("Must contain only digits")
        .nullable(),

      _60_min_price: yup
        .number()
        .min(1, "Cannot be less than 1")
        .typeError("Must contain only digits")
        .nullable(),
    })
    .test(
      'at-least-one-price',
      'At least one price option is required',
      function (value) {
        const {
          _15_min_price,
          _30_min_price,
          _45_min_price,
          _60_min_price,
        } = value || {};

        // Check if at least one is a valid number
        const hasOne = [_15_min_price, _30_min_price, _45_min_price, _60_min_price].some(
          val => typeof val === 'number' && !isNaN(val)
        );

        return hasOne;
      }
    );


  return (
    <div className="w-full h-screen overflow-hidden">
      <TopDivider />
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-10 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-semibold">Availability & Fee</div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-3">
            <div className="overflow-x-auto">
              <table className="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="border-b text-md p-2 font-normal text-left w-24">Time</th>
                    {days.map(day => (
                      <th key={day} className="border-b text-md p-2 font-normal text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time}>
                      <td className="border-b p-2 text-sm text-left">{time}</td>
                      {days.map(day => {
                        const key = `${day}_${time}`;
                        const checked = availability[key];
                        return (
                          <td key={key} className="border-b p-2 text-center">
                            <input
                              type="checkbox"
                              checked={!!checked}
                              onChange={() => toggleAvailability(day, time)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

              
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              _15_min_price: null, _30_min_price: null, _45_min_price: null, _60_min_price: null,
              currency: ''
            }}
            onSubmit={values => {
              const { _15_min_price, _30_min_price, _45_min_price, _60_min_price, currency } = values

              if(!_15_min_price && !_30_min_price && !_45_min_price && !_60_min_price){
                toast.info("Set at least one price for a given duration")
                return
              }

              if(!currency){
                toast.info("Set a currency")
                return
              }

              const requestBody = 
              [
                { price: _15_min_price, min: 15 }, { price: _30_min_price, min: 30 }, 
                { price: _45_min_price, min: 45 }, { price: _60_min_price, min: 60 }
              ]
              .map(opt => {
                return {
                  provider_id: userProfile?.id,
                  price: opt.price,
                  duration_secs: opt.min * 60,
                  currency
                }
              })

              handlePriceSave({ requestBody })
            }}
          >
            {({ handleBlur, handleChange, handleSubmit, values, isValid, dirty }) => (
              <div className="flex-1 py-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-bold">Fee</div>
                  <div className="flex justify-end">
                    <button
                      disabled={!(isValid && dirty)}
                      onClick={handleSubmit}
                      style={{
                        opacity: !(isValid && dirty) ? 0.5 : 1
                      }}
                      className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-0">
                  <div className="max-w-[700px] p-4">
                    <div className="flex items-center gap-2 w-full mb-2">
                      <div>
                        <label className="text-sm mr-2">Currency</label>
                        <p className='m-0 p-0 text-xs text-gray-600 italic fw-500'>
                          { bookingCostOpts.currency || 'Not set'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-10">
                      <label className="text-sm mr-2">Currency</label>
                      <select
                        placeholder='Select currency'
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='currency'
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                      >
                        <option value={""} disabled={true}>Choose one</option>
                        {
                          currencies.map((c, i) => (
                            <option key={i} value={c.type}>{c.label}</option>
                          ))
                        }
                      </select>
                      <ErrorMessage name='currency'>
                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                      </ErrorMessage>                                          
                    </div>                      
                    <div className="flex items-center gap-2 w-full mb-4">
                      <label className="text-sm mr-2">Session Duration</label>
                    </div>

                    <div className="flex items-center gap-2 w-full mb-4">
                      <div>
                        <label className="text-sm w-20">15 mins</label>
                        <p className='m-0 p-0 text-xs text-gray-600 italic fw-500'>
                          { formatNumberWithCommas(bookingCostOpts[15]) || 'Not set'}
                        </p>                        
                      </div>
                      <input
                        type="text"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                        placeholder="-"
                        value={values._15_min_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={"_15_min_price"}
                      />  
                      <ErrorMessage name='_15_min_price'>
                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                      </ErrorMessage>                                          
                    </div>
                                         
                    <div className="flex items-center gap-2 w-full mb-4">
                      <div>
                        <label className="text-sm w-20">30 mins</label>
                        <p className='m-0 p-0 text-xs text-gray-600 italic fw-500'>
                          { formatNumberWithCommas(bookingCostOpts[30]) || 'Not set'}
                        </p>                            
                      </div>
                      <input
                        type="text"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                        placeholder="-"
                        value={values._30_min_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={"_30_min_price"}
                      />
                      <ErrorMessage name='_30_min_price'>
                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                      </ErrorMessage>                       
                    </div>
                    <div className="flex items-center gap-2 w-full mb-4">
                      <div>
                        <label className="text-sm w-20">45 mins</label>
                        <p className='m-0 p-0 text-xs text-gray-600 italic fw-500'>
                          { formatNumberWithCommas(bookingCostOpts[45]) || 'Not set'}
                        </p>                            
                      </div>
                      <input
                        type="text"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                        placeholder="-"
                        value={values._45_min_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={"_45_min_price"}
                      />
                      <ErrorMessage name='_45_min_price'>
                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                      </ErrorMessage>   
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <div>
                        <label className="text-sm w-20">1 hour</label>
                        <p className='m-0 p-0 text-xs text-gray-600 italic fw-500'>
                          { formatNumberWithCommas(bookingCostOpts[60]) || 'Not set'}
                        </p>                            
                      </div>
                      <input
                        type="text"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                        placeholder="-"
                        value={values._60_min_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={"_60_min_price"}
                      />
                      <ErrorMessage name='_60_min_price'>
                        { errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} /> }
                      </ErrorMessage> 
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Formik>

          {success && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
              <div className="bg-white w-[400px] p-6 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="text-green-600" size={32} />
                  </div>
                </div>
                <div className="text-lg font-medium mb-1">Success</div>
                <p className="text-sm text-gray-600 mb-5">
                  All changes in your availability has been successful
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="cursor-pointer bg-primary-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
