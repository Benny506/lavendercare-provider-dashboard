import TopDivider from '@/components/TopDivider'
import Image from '@/components/ui/image'
import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const IndividualSettings = () => {
    const navigate = useNavigate()
    return (
        <div>
            <TopDivider />

            <div className='flex flex-col gap-6'>
                <div className='bg-white rounded-xl w-full p-4 flex flex-col gap-5'>


                    <div className='flex gap-3 justify-between items-center cursor-pointer' onClick={() => navigate('general-settings')}>
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>General Setting</h1>
                            <p className='text-xs text-gray-500'>Login Settings, Individual Provider information</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div className='flex gap-3 justify-between items-center cursor-pointer' onClick={() => navigate('/individual/dashboard/settings/notifications')}>
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Notification</h1>
                            <p className='text-xs text-gray-500'>Email or phone alerts</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>


                    {/* <div className='flex gap-3 justify-between items-center '>
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Security Center</h1>
                            <p className='text-xs text-gray-500'>Protect your Account</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div> */}


                    <div 
                        style={{ 
                            opacity: 0.5
                        }}
                        className='flex gap-3 justify-between items-center cursor-pointer' 
                        onClick={() => 
                            // navigate('/individual/dashboard/settings/integrations')
                            toast.info("Working on it...")
                        }
                    >
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Integrations</h1>
                            <p className='text-xs text-gray-500'>API connections for payments</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div 
                        onClick={() => {
                            toast.info("Documents verified. Contact support for update or addition")
                        }}
                        className='cursor-pointer flex gap-3 justify-between items-center'
                    >
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Documents</h1>
                            <p className='text-xs text-gray-500'>Upload and manage documents</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                </div>


                {/* <div className='bg-white rounded-xl w-full p-4 flex flex-col gap-5'>
                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Contact Customer Service</h1>
                            <p className='text-xs text-gray-500'>View your transaction limits</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Rate Us</h1>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Close Account</h1>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>
                </div> */}
            </div>

        </div>
    )
}

export default IndividualSettings