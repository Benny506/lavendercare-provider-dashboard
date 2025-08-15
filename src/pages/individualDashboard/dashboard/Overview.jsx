import Notifications from '@/components/Notifications';
import TopDivider from '@/components/TopDivider'
import { Button } from '@/components/ui/button'
import ZeroItems from '@/components/ui/ZeroItems';
import { formatDate1, timeToAMPM } from '@/lib/utils';
import { getNotificationState } from '@/redux/slices/notificationSlice';
import { getUserDetailsState } from '@/redux/slices/userDetailsSlice';
import { Icon } from '@iconify/react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Overview = () => {

  const navigate = useNavigate()

  const availability = useSelector(state => getUserDetailsState(state).availability)
  const bookings = useSelector(state => getUserDetailsState(state).bookings)
  const screenings = useSelector(state => getUserDetailsState(state).screenings)
  const notifications = useSelector(state => getNotificationState(state).notifications)

  const availabilitySet = (availability || [])?.length > 0
  const newConsultations = (bookings || [])?.filter(b => b.status === 'new')
  const totalScreeningsCount = (screenings || [])?.length

  return (
    <div>
      <TopDivider />

      {/* Quick Actions */}
      <div className="flex w-full justify-between items-center">
        <p className='font-bold text-lg'>Quick Action</p>
        <div className="flex gap-4 justify-end mb-6 ">
          <Button onClick={() => navigate("/individual/dashboard/availability")} className="rounded-3xl px-6 py-6 bg-white text-black font-extrabold cursor-pointer">{availabilitySet ? 'Update' : 'Set'} Availability</Button>
          <Button onClick={() => navigate("/individual/dashboard/caseload")} className="rounded-3xl px-6 py-6 bg-primary-600 font-extrabold text-white cursor-pointer">
            View Caseload
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {/* Card 1 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Upcoming sessions</p>
          <div className="flex items-start gap-4 py-4">
            <p className='m-0 p-0 fw-700 txt-40'>
              { newConsultations?.length }
            </p>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div onClick={() => navigate('/individual/dashboard/consultation')} className='cursor-pointer flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl text-[#4CAEA0]" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">Total Screenings</p>
          <div className="flex items-start gap-4 py-4">
            <p className='m-0 p-0 fw-700 txt-40'>
              { totalScreeningsCount }
            </p>
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div onClick={() => navigate('/individual/dashboard/screenings')} className='cursor-pointer flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl text-[#4CAEA0]" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <p className="text-md font-medium">High-Risk Alerts</p>
          <div className="flex items-start gap-4 py-4">
            <hr className='h-2 w-4 bg-black my-4' />
          </div>
          <hr className="bg-[#D2C3EF] h-0.5 border-none" />
          <div className='flex items-center gap-2 text-primary-600 font-extrabold'>
            <p className="text-lg mt-3 cursor-pointer">View all</p>
            <Icon icon="mdi:arrow-right" className="mt-3.5 text-xl text-[#4CAEA0]" />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div>
        <p className='font-bold text-lg'>Notifications</p>

        <div className="bg-white rounded-xl p-6 mt-4">
          <div className='flex flex-col'>
            {notifications.length === 0 ? (
              <ZeroItems 
                zeroText={'No Notifications found'}
              />
            ) : (
              <>
                <Notifications count={3} />

                <button className="text-start text-[#8B8B8A] text-sm mt-2 cursor-pointer">
                  View All Notifications
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="mt-6">
        <p className='font-bold text-lg'>Upcoming Sessions</p>

        <div className="bg-white rounded-xl p-6 mt-4">
          <div className="flex flex-col">
            {newConsultations.length === 0 ? (
              <ZeroItems 
                zeroText={'No new session found'}
              />
            ) : (
              <>
                {newConsultations.map((booking, index) => {

                  const { user_profile, service_type, day, hour } = booking

                  const dateISO = new Date(day).toISOString()

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">
                          {`${formatDate1({ dateISO })} --- ${timeToAMPM({ hour, minutes: 0 })}`} <span className="font-normal">{user_profile?.name}</span>
                        </p>
                        <p className="text-xs text-gray-500">{service_type?.type?.replaceAll("_", " ")}</p>
                      </div>

                      <button 
                        onClick={() => navigate('/individual/dashboard/consultation', { state: { booking_id: booking?.id } })}
                        className="px-5 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                      >
                        View
                      </button>
                    </div>
                  )}
                )}
                <button onClick={() => navigate('/individual/dashboard/consultation')} className="text-start text-[#8B8B8A] text-sm mt-2 cursor-pointer">
                  View All Sessions
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
