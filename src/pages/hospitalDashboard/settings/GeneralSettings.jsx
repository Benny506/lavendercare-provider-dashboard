import TopDivider from '@/components/TopDivider'
import Image from '@/components/ui/image'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

const GeneralSettings = () => {
    const navigate = useNavigate()
    return (
        <div>
            <TopDivider />

            <div className='flex flex-col gap-3'>
                <div className='flex flex-col w-full bg-white rounded-xl p-6'>
                    <div className='flex border-b border-gray-300 pb-2 mb-4 items-center justify-between'>
                        <p className='text-sm'>Change Payment PIN</p>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>

                    <div className='flex border-b border-gray-300 pb-2 mb-4 items-center justify-between'>
                        <p className='text-sm'>Forgot Payment PIN</p>
                        <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                    </div>
                </div>

                <div className='flex gap-3 justify-between items-center bg-white rounded-xl w-full p-6 cursor-pointer' onClick={() => navigate('/hospital/dashboard/settings/general-settings/hospital-information')}>
                    <Image src="/assets/general-settings-icon.svg" />
                    <div className='flex flex-col flex-1'>
                        <p className='text-xs text-gray-500'>Edit hospital Information</p>
                    </div>
                    <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                </div>
            </div>
        </div>
    )
}

export default GeneralSettings