import { Icon } from '@iconify/react'
import React from 'react'
import { Button } from './ui/button'

const ConsultationInfoModal = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-img rounded-xl p-4 w-full max-w-md shadow-xl relative">
                <div className='bg-white rounded-xl p-6 w-full flex flex-col justify-between'>
                    <Button className="bg-transparent shadow-none text-primary-600 text-base flex items-start justify-start gap-1 font-extrabold w-full mb-3">
                        <Icon icon="mdi-light:arrow-left" className="text-[30px]" />
                        <span>Back</span>
                    </Button>

                    <div className='flex items-center justify-between w-full mb-2'>
                        <p className='font-bold text-lg'>Case ID: #LC‑2025‑0345</p>
                        <p className="bg-[#F1ECFA] text-primary-500 rounded-2xl px-3 w-max">Attended</p>
                    </div>

                    <div className='max-w-max flex flex-col gap-2 mb-2'>
                        <p className='font-bold text-lg'>Patient Info</p>
                        <p><span>Mother’s name:</span> Sarah Adebayo</p>
                        <p><span>Age: </span>35</p>
                        <p><span>Postpartum Days:</span> 60</p>
                    </div>

                    <div className='max-w-max flex flex-col gap-2 mb-2'>
                        <p className='font-bold text-lg'>Consultation Metadata</p>
                        <p><span>Assigned Doctor: </span>Dr. Tolu Adebayo</p>
                        <p><span>Care Type: </span>Medical Consultation</p>
                        <p><span>Date & Time: </span>03-07, 2pm</p>
                        <p><span>Duration: </span>45mins</p>
                    </div>

                    <div className='w-full mb-3 border-b border-gray-300 pb-3'>
                        <p className='font-bold text-lg'>Summary Notes</p>
                            <p className='text-md font-light w-full'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et... Read More</p>
                    </div>

                    <Button className="bg-primary-600 rounded-3xl py-6 px-6 mt-1 font-bold">
                        Download Full Report
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConsultationInfoModal