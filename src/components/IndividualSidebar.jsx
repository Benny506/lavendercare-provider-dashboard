import { Icon } from '@iconify/react';
import { Avatar, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserDetailsState } from '@/redux/slices/userDetailsSlice';
import Image from './ui/image';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

const navItems = [
    {
        path: "/individual/dashboard",
        id: 'dashboard',
        label: 'Dashboard',
        Icon: ({ color = '#000' }) => (
            <Icon icon="material-symbols:dashboard-outline" width="24" height="24" style={{ color }} />
        ),
    },
    {
        path: '/individual/dashboard/availability',
        id: 'availability',
        label: 'Set Availability & Fee',
        Icon: ({ color = "#000" }) => (
            <Icon icon="uil:calender" width="24" height="24" style={{ color }} />
        )
    },
    {
        path: '/individual/dashboard/consultation',
        id: 'consultations',
        label: 'Consultations',
        Icon: ({ color = "#000" }) => (
            <Icon icon="ant-design:message-outlined" width="24" height="24" style={{ color }} />
        )
    },
    // {
    //     path: '/individual/dashboard/bookings/',
    //     id: 'bookings',
    //     label: 'Bookings', 
    //     Icon: ({ color = "#000" }) => (
    //         <Icon icon="ph:bookmark" width="24" height="24" style={{ color }} />
    //     )
    // },
    {
        path: '/individual/dashboard/caseload',
        id: 'caseLoad',
        label: 'Caseload',
        Icon: ({ color = "#000" }) => (
            <Icon icon="octicon:people-24" width="24" height="24" style={{ color }} />
        )
    },
    {
        path: '/individual/dashboard/screenings',
        id: 'screenings',
        label: 'Screenings',
        Icon: ({ color = "#000" }) => (
            <Icon icon="material-symbols:note-outline" width="24" height="24" style={{ color }} />
        )
    },
];


const IndividualSidebar = ({isOpen, setIsOpen}) => {

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const userProfile = useSelector(state => getUserDetailsState(state).profile)

    const [activeNav, setActiveNav] = useState('')

    // const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (pathname.toLowerCase().includes('availability')) {
            setActiveNav('availability')

        } else if (pathname.toLowerCase().includes('consultation')) {
            setActiveNav('consultations')

        } else if (pathname.toLowerCase().includes('bookings')) {
            setActiveNav('bookings')

        } else if (pathname.toLowerCase().includes('caseload')) {
            setActiveNav('caseLoad')

        } else if (pathname.toLowerCase().includes('screenings')) {
            setActiveNav('screenings')

        } else if (pathname.toLowerCase().includes('settings')) {
            setActiveNav('settings')

        } else {
            setActiveNav('dashboard')
        }
    }, [pathname])

    return (
        <>
            {/* ✅ Mobile toggle bar */}
            {/* <div className="lg:hidden fixed top-[42px] left-6 z-50 ">
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#2D1A4A]">
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div> */}
            <aside
                className={`fixed top-0 left-0 h-full md:h-max lg:h-screen w-64 bg-white border-r border-[#E9E9E9] flex flex-col justify-between transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}
            >
                <div className=''>
                    {/* Logo */}
                    <div className="flex items-center px-8 pt-8 pb-6 cursor-pointer  gap-2" onClick={() => navigate('/individual/dashboard')}>
                        <Image src="/assets/lavendercare-logo.svg" alt="LavenderCare Logo" className="w-50" z/>
                        <X size={30} onClick={() => { setIsOpen(false) }} className='block lg:hidden' />
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 px-8">
                        {navItems.map((item, idx) => {

                            const { Icon, id, path } = item

                            const isActive = activeNav == id ? true : false

                            const handleNavClick = () => {
                                path && navigate(path)
                                setIsOpen(false)
                                return;
                            }

                            return (
                                <div
                                    key={item.label}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-[#7B3FE4] text-white' : 'text-[#2D1A4A] hover:bg-[#F3F0FA]'}`}
                                >
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <Icon
                                            color={isActive ? "#FFF" : "#000"}
                                        />
                                    </span>
                                    <span className="font-medium text-md">{item.label}</span>
                                </div>
                            )
                        })}
                    </nav>

                    {/* Settings & Support */}
                    <div className="mt-10 flex flex-col gap-2 px-8">
                        <div
                            onClick={() => {
                                navigate('/individual/dashboard/settings')
                                setIsOpen(false)
                            }}
                            className={`flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors ${activeNav == 'settings' ? 'bg-[#7B3FE4] text-white' : 'text-[#2D1A4A] hover:bg-[#F3F0FA]'}`}
                        >
                            <span className="w-6 h-6 flex items-center justify-center">
                                <Icon icon="material-symbols:settings-outline-rounded" width="24" height="24" style={{ color: activeNav == 'settings' ? "#FFF" : "#000" }} />
                            </span>
                            <span className="font-medium text-md">Settings</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer text-[#2D1A4A] hover:bg-[#F3F0FA]">
                            <span className="w-6 h-6 flex items-center justify-center">
                                <Icon icon="material-symbols-light:support-agent-outline-rounded" width="24" height="24" style={{ color: "#000" }} />
                            </span>
                            <span className="font-medium text-md">Contact support</span>
                        </div>
                    </div>
                </div>

                {/* User Profile */}
                <div className="px-6 py-5 pb-15 flex items-center gap-4 border-t border-[#E9E9E9]">
                    <Avatar>
                        <AvatarImage src="/assets/Avatar.svg" />
                        {/* <AvatarFallback>CN</AvatarFallback> */}
                    </Avatar>
                    <div className="flex-1">
                        <div className="font-bold text-md text-[#2D1A4A]">{userProfile?.provider_name}</div>
                        <div className="text-[#7B3FE4] text-sm">{userProfile?.email}</div>
                    </div>
                    <button className="cursor-pointer">
                        <Icon icon="solar:logout-outline" width="24" height="24" style={{ color: "red" }} />
                    </button>
                </div>
            </aside >
        </>
    )
}

export default IndividualSidebar