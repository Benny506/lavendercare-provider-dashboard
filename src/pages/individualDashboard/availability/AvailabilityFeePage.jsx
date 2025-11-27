import React, { useEffect, useState } from 'react';
import { Check, Trash } from 'lucide-react';
import TopDivider from '@/components/TopDivider';
import { useDispatch, useSelector } from 'react-redux';
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice';
import { toast } from 'react-toastify';
import supabase from '@/database/dbInit';
import { getUserDetailsState, setUserDetails } from '@/redux/slices/userDetailsSlice';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup'
import ErrorMsg1 from '@/components/ErrorMsg1';
import { currencies, formatNumberWithCommas, secondsToLabel, timeToAMPM_FromHour } from '@/lib/utils';
import HourSelect from '@/components/HourSelect';
import { Button } from '@/components/ui/button';
import ZeroItems from '@/components/ui/ZeroItems';
import { Icon } from '@iconify/react';
import ServiceType from './auxiliiary/ServiceType';
import useApiReqs from '@/hooks/useApiReqs';

const defaultAvailability = {
  monday: { opening: '', closing: '' },
  tuesday: { opening: '', closing: '' },
  wednesday: { opening: '', closing: '' },
  thursday: { opening: '', closing: '' },
  friday: { opening: '', closing: '' },
  saturday: { opening: '', closing: '' },
  sunday: { opening: '', closing: '' }
}

const durationsOptions = [
  { title: '15 mins', value: 15 * 60 },     // 900
  { title: '30 mins', value: 30 * 60 },     // 1800
  { title: '1 hour', value: 60 * 60 },      // 3600
];


export default function AvailabilityFeePage() {
  const dispatch = useDispatch()

  const { insertConsultationType, deleteConsultationType, updateConsultationType } = useApiReqs()

  const user = useSelector(state => getUserDetailsState(state).user)
  const userProfile = useSelector(state => getUserDetailsState(state).profile)
  const bookingCostData = useSelector(state => getUserDetailsState(state).bookingCostData)

  const [days, setDays] = useState(userProfile?.availability || defaultAvailability)
  const [selectedDay, setSelectedDay] = useState('monday')
  const [success, setSuccess] = useState(false);
  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
  const [bookingCostOpts, setBookingCostOpts] = useState({
    '15': null, '30': null, '45': null, '60': null, currency: ''
  })
  const [serviceTypeModal, setServiceTypeModal] = useState({ visible: false, hide: null, info: null })

  useEffect(() => {
    const { isLoading, errorMsg } = apiReqs

    if (isLoading) dispatch(appLoadStart());
    else dispatch(appLoadStop())

  }, [apiReqs])

  useEffect(() => {
    if (bookingCostData) {
      const opts = { ...bookingCostOpts }

      for (let i = 0; i < bookingCostData.length; i++) {
        const { price, duration_secs, currency } = bookingCostData[i]

        const durationMin = duration_secs / 60

        opts[durationMin] = price
        opts.currency = currency
      }

      setBookingCostOpts(opts)
    }
  }, [bookingCostData])

  const handleSave = async ({ requestInfo }) => {

    try {

      const { availability } = requestInfo

      if (availability) {
        let oneSlotChosen = false

        const availableDays = Object.keys(availability)

        for (let i = 0; i < availableDays.length; i++) {
          const { opening, closing } = availability[availableDays[i]]
          if (opening && closing) {
            oneSlotChosen = true
            break
          }
        }

        if (!oneSlotChosen) return toast.info("Select at least one available slot")
      }

      setApiReqs({ isLoading: true, errorMsg: null })

      const { data, error } = await supabase
        .from('provider_profiles')
        .update({
          ...requestInfo
        })
        .eq("provider_id", userProfile?.provider_id)
        .select('*')
        .single()

      if (!data || error) {
        console.log(error, error.message)
        throw new Error()
      }

      dispatch(setUserDetails({
        profile: {
          ...userProfile,
          ...requestInfo
        }
      }))

      setApiReqs({ isLoading: false, errorMsg: null })
      setSuccess(true);
      toast.success("Availability settings saved")

    } catch (error) {
      console.log(error)
      return saveError({ errorMsg: 'Error saving availability settings!' })
    }
  };

  const saveError = ({ errorMsg }) => {
    setApiReqs({ isLoading: false, errorMsg })
    toast.error(errorMsg)

    return
  }

  const openServiceTypeModal = ({ info }) => setServiceTypeModal({ visible: true, hide: hideServiceTypeModal, info })
  const hideServiceTypeModal = () => setServiceTypeModal({ visible: false, hide: null })

  return (
    <div className="w-full h-screen">
      <TopDivider />
      <div className="flex flex-col h-full">
        <div className="flex-1 md:px-10 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl md:text-2xl font-semibold">Availability & Fee</div>
            <div className="flex justify-end">
              <button
                onClick={() => handleSave({ requestInfo: { availability: days } })}
                className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white lg:w-full w-[90vw] border rounded-lg p-3">
            <div className='border border-grey-100 rounded-md lg:flex block w-full'>
              <div className='border-r border-grey-100 py-4 pb-2 px-2  space-y-4 flex flex-row flex-wrap lg:flex-col items-center lg:w-[20%] w-full lg:mb-0 mb-4 font-semibold text-sm'>
                {Object.keys(days).map((day, index) => {

                  const active = day === selectedDay ? true : false

                  const handleDayClick = () => setSelectedDay(day)

                  return (
                    <div key={day} onClick={handleDayClick} className={`lg:w-full w-1/2 text-center py-3 ${active ? "text-white bg-purple-500" : "cursor-pointer hover:bg-gray-100"} p-2 rounded-lg`}>
                      <p>{day}</p>
                    </div>
                  )
                }
                )}
              </div>

              <div>
                <Formik
                  validationSchema={yup.object().shape({
                    start_hour: yup.string()
                      .required("Start hour is required"),
                    end_hour: yup.string()
                      .required("End hour is required")
                      .test("is-greater", "End hour must be later than start hour", function (value) {
                        const { start_hour } = this.parent;
                        if (!start_hour || !value) return false;

                        // Convert to minutes for easy comparison
                        const [sh, sm] = start_hour.split(":").map(Number);
                        const [eh, em] = value.split(":").map(Number);

                        const startTotal = sh * 60 + sm;
                        const endTotal = eh * 60 + em;

                        return endTotal > startTotal;
                      })
                  })}
                  initialValues={{
                    start_hour: '', end_hour: ''
                  }}
                  onSubmit={(values, { resetForm }) => {
                    const { start_hour, end_hour } = values

                    const [sh, sm] = start_hour.split(":").map(Number);
                    const [eh, em] = end_hour.split(":").map(Number);

                    setDays(prev => ({
                      ...prev,
                      [selectedDay]: { opening: sh, closing: eh }
                    }))

                    resetForm()
                  }}
                >
                  {({ handleBlur, handleChange, handleSubmit, isValid, dirty, values }) => (
                    <div className='m-7 flex flex-col items-start justify-center px-2 gap-4'>
                      <div className=''>
                        {
                          days[selectedDay]?.opening
                            ?
                            <p className=''>
                              {timeToAMPM_FromHour({ hour: days[selectedDay]?.opening })} - {timeToAMPM_FromHour({ hour: days[selectedDay]?.closing })}
                            </p>
                            :
                            <p className=''>
                              Not set
                            </p>
                        }
                      </div>

                      <div className=''>
                        <label className=''>Opening at</label>
                        <br />
                        <HourSelect
                          name="start_hour"
                          value={values.start_hour}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <ErrorMessage name='start_hour'>
                          {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                        </ErrorMessage>
                      </div>

                      <div className=''>
                        <label className=''>Closing at</label>
                        <br />
                        <HourSelect
                          name="end_hour"
                          value={values.end_hour}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        <ErrorMessage name='end_hour'>
                          {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                        </ErrorMessage>
                      </div>

                      <Button
                        onClick={handleSubmit}
                        className={'bg-purple-600'}
                      >
                        Set
                      </Button>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          </div>


          {/* Pricing Section */}
          <div className="bg-white rounded-lg p-4 shadow mb-6 mt-6">
            <div className="flex items-center justify-between mb-3 gap-4 flex-wrap">
              <h3 className="text-xl font-bold text-grey-700">Consultation Types</h3>
              <Button onClick={() => openServiceTypeModal({ info: null })} variant="ghost" className="text-primary-500">
                <Icon icon="mdi:edit-outline" width="30" height="30" />Add
              </Button>
            </div>
            {
              userProfile?.consultation_types?.length > 0
                ?
                <div className="flex items-center justify-between flex-wrap">
                  {
                    userProfile?.consultation_types?.map((t, i) => {
                      return (
                        <div
                          key={i}
                          className="w-1/2 px-2"
                        >
                          <div className="bg-grey-100 rounded-2xl mb-4">
                            <div className="p-4">
                              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                <h3 className="m-0 p-0 font-bold">Name</h3>
                                <p className="text-gray-900 m-0 p-0">{t?.type_name}</p>
                              </div>

                              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                <h3 className="m-0 p-0 font-bold">Duration</h3>
                                <p className="text-gray-900 m-0 p-0">{secondsToLabel({ seconds: t?.duration })}</p>
                              </div>

                              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                <h3 className="m-0 p-0 font-bold">Price</h3>
                                <p className="text-gray-900 m-0 p-0">{t?.currency} {formatNumberWithCommas(t?.price)}</p>
                              </div>

                            </div>

                            <hr />

                            <div className="flex items-center justify-between mt-4 gap-2">
                              <Button onClick={() => openServiceTypeModal({ info: t })} variant="ghost" className="text-primary-500">
                                <Icon icon="mdi:edit-outline" width="30" height="30" />Edit
                              </Button>
                              <Button onClick={
                                () =>
                                  deleteConsultationType({
                                    callBack: () => {},
                                    type_id: t?.id
                                  })
                              }
                                variant="ghost"
                                className="text-red-500"
                              >
                                <Trash size={30} />Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                :
                <div className="flex items-center justify-center">
                  <ZeroItems
                    zeroText={'No consultation types added'}
                  />
                </div>
            }
          </div>

          {/* <Formik
            validationSchema={validationSchema}
            initialValues={{
              base_duration: '',
              base_price: '',
              currency: ''
            }}
            onSubmit={values => {
              handleSave({ requestInfo: values })
            }}
          >
            {({ handleBlur, handleChange, handleSubmit, values, isValid, dirty }) => (
              <div className="flex-1 py-6 mb-4 md:mb-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-bold">Fee</div>
                  <div className="flex justify-end">
                    <button
                      disabled={!(isValid && dirty)}
                      onClick={handleSubmit}
                      style={{
                        opacity: !(isValid && dirty) ? 0.5 : 1
                      }}
                      className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-3xl text-sm font-medium"
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
                          {bookingCostOpts.currency || 'Not set'}
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
                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                      </ErrorMessage>
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <label className="text-sm mb-1">Base price: {userProfile?.base_price || 'Not set'}</label>
                      <input
                        type="number"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                        placeholder="-"
                        value={values.base_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={"base_price"}
                      />
                      <ErrorMessage name='base_price'>
                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} position={'left'} />}
                      </ErrorMessage>
                    </div>

                    <div className="flex flex-col w-full mb-4">
                      <label className="text-sm mb-1">Base Duration: {userProfile?.base_duration ? secondsToLabel({ seconds: userProfile?.base_duration }) : 'Not set'}. {'('}This is the smallest time duration that you can be booked for{')'}</label>
                      <select
                        name="base_duration"
                        value={values.base_duration}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Set a duration"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm bg-white"
                      >
                        <option value={''} selected disabled>Set a duration</option>
                        {
                          durationsOptions.map((d, i) => {
                            const { title, value } = d

                            return (
                              <option value={value}>
                                {title}
                              </option>
                            )
                          })
                        }
                      </select>
                      <ErrorMessage name="base_duration">
                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Formik> */}

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
                  className="cursor-pointer bg-purple-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      <ServiceType
        info={serviceTypeModal?.info}
        isOpen={serviceTypeModal?.visible}
        hide={serviceTypeModal?.hide}
        handleContinueBtnClick={({ requestInfo, info }) => {
          if (info?.id) {
            return updateConsultationType({
              callBack: () => { },
              update: requestInfo,
              type_id: info?.id
            })
          }

          insertConsultationType({
            callBack: () => { },
            requestInfo: {
              ...requestInfo,
              provider_id: user?.id
            }
          })
        }}
      />
    </div>
  );
}
