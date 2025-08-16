import TopDivider from '@/components/TopDivider'
import { Switch } from '@/components/ui/switch'
import React from 'react'

const Notifications = () => {
    return (
        <div>
            <TopDivider />

            <div className="w-full bg-white rounded-2xl p-3">

                <div className='flex justify-between items-center w-full md:max-w-lg'>

                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                            <p>
                                Receive new consultation alerts
                            </p>
                            <Switch
                                checked="bg-primary-600"
                                className="data-[state=checked]:bg-primary-600 bg-primary-600"
                                onCheckedChange={(val) => {
                                    /* handle toggle… */
                                }}
                            />
                        </div>

                        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                            <p>
                                Receive new consultation alerts
                            </p>
                            <Switch
                                checked="bg-primary-600"
                                className="data-[state=checked]:bg-primary-600 bg-primary-600"
                                onCheckedChange={(val) => {
                                    /* handle toggle… */
                                }}
                            />
                        </div>

                        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                            <p>
                                Receive new consultation alerts
                            </p>
                            <Switch
                                checked="bg-primary-600"
                                className="data-[state=checked]:bg-primary-600 bg-primary-600"
                                onCheckedChange={(val) => {
                                    /* handle toggle… */
                                }}
                            />
                        </div>

                        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                            <p>Delivery method</p>
                            <div className='flex gap-2'>
                                <div>
                                <input type="radio" name="sms" id="" />
                                <label htmlFor="sms">SMS</label>
                            </div>
                            <div>
                                <input type="radio" name="email" id="" />
                                <label htmlFor="sms">Email</label>
                                
                            </div>
                            </div>
                            
                        </div>

                        <div className='flex flex-col gap-2 p-4'>
                            <label htmlFor="email">Admin notification email</label>
                            <input type="email" name="email" id="" className="border border-[#B1B1B0] focus:outline-none rounded px-3 py-1 w-full text-base" placeholder='admin@gracematernity.com' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications