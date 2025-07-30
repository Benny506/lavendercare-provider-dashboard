import React from 'react'
import { Button } from './ui/button'
import { Icon } from '@iconify/react'

const InviteDoctorModal = ({ visible, hide }) => {

    if(!visible || !hide) return <></>

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            {/* Modal Card */}
            <div className="bg-img rounded-xl p-4 w-full max-w-md shadow-xl relative">
                <div className='bg-white rounded-xl p-6 w-full'>
                    {/* Close Icon */}
                    <div className="absolute top-4 right-4 m-6 text-xl cursor-pointer">
                        <Icon onClick={hide} icon="iconoir:cancel" width="24" height="24" style={{ color: "#020201" }} />
                    </div>

                    <form action="" className='w-full flex flex-col gap-4'>
                        {/* Title */}
                        <h2 className="text-lg font-semibold mb-4">Invite Doctor</h2>

                        {/* Input Label */}
                        <label htmlFor="email" className="text-sm font-medium block mb-1">
                            Doctor Email Address
                        </label>

                        {/* Email Input */}
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter doctor’s email address"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        {/* Invite Button */}
                        <div className='flex justify-end cursor-pointer'>
                            <Button
                                onClick
                                className="bg-primary-600 text-white text-md font-semibold py-2 rounded-3xl place-items-end"
                            >
                                Invite
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InviteDoctorModal