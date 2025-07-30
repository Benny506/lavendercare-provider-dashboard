import TopDivider from '@/components/TopDivider'
import Image from '@/components/ui/image'
import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()
    return (
        <div>
            <TopDivider />

            <div className='flex flex-col gap-6'>
                <div className='bg-white rounded-xl w-full p-4 flex flex-col gap-5'>


                    <div className='flex gap-3 justify-between items-center cursor-pointer' onClick={() => navigate('general-settings')}>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>General Setting</h1>
                            <p className='text-xs text-gray-500'>Login Setting, Hospital information</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>


                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Documents</h1>
                            <p className='text-xs text-gray-500'>Upload and manage documents</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>


                    <div className='flex gap-3 justify-between items-center cursor-pointer' onClick={() => navigate('/hospital/dashboard/settings/notification')}>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Notification</h1>
                            <p className='text-xs text-gray-500'>Email or phone alerts</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>


                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Security Center</h1>
                            <p className='text-xs text-gray-500'>Protect your Account</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>


                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>Integrations</h1>
                            <p className='text-xs text-gray-500'>API connections for payments</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                </div>


                <div className='bg-white rounded-xl w-full p-4 flex flex-col gap-5'>

                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>General Setting</h1>
                            <p className='text-xs text-gray-500'>Login Setting, Hospital information</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>General Setting</h1>
                            <p className='text-xs text-gray-500'>Login Setting, Hospital information</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div className='flex gap-3 justify-between items-center '>
                        <Image src="/assets/general-settings-icon.svg" />
                        <div className='flex flex-col flex-1'>
                            <h1 className='text-md font-bold'>General Setting</h1>
                            <p className='text-xs text-gray-500'>Login Setting, Hospital information</p>
                        </div>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings