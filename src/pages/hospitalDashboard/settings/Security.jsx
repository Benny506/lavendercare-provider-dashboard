import TopDivider from '@/components/TopDivider'
import { Switch } from '@/components/ui/switch'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

const Security = () => {
    const navigate = useNavigate()
    return (
        <div>
            <TopDivider />

            <h2 className="font-extrabold text-xl mb-3">Security</h2>

            <div className="w-full bg-white rounded-2xl p-4">

                <div className='max-w-lg'>
                    <div className='flex flex-col w-full p-4 gap-2'>
                        <div className='flex border-b border-gray-300 pb-4 mb-4 items-center justify-between cursor-pointer' onClick={() => navigate('/hospital/dashboard/settings/security/change-password')}>
                            <p className='text-sm'>Change Password</p>
                            <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                        </div>
                        <div className='flex justify-between items-center pb-4 mb-3 border-b border-gray-200'>
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
                        <div className='flex border-b border-gray-300 pb-4 mb-4 items-center justify-between'>
                            <p className='text-sm'>Session Management</p>
                            <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                        </div>
                        <div className='flex border-b border-gray-300 pb-4 mb-4 items-center justify-between'>
                            <p className='text-sm'>Activity Logs</p>
                            <Icon icon="oui:arrow-right" width="16" height="16" style={{ color: "gray" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Security