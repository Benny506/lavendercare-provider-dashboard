import { Icon } from '@iconify/react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './ui/image';

const navItems = [
  {
    label: 'Dashboard', icon: (
      <Icon icon="material-symbols:dashboard-outline" width="24" height="24" style={{ color: "#FFFFFF" }} />
    ), active: true
  },
  {
    label: 'Doctors', icon: (
      <Icon icon="ic:outline-account-box" width="24" height="24" style={{ color: "#000000" }} />
      // mdi:assignment-ind
    )
  },
  {
    label: 'Consultations', icon: (
      <Icon icon="ic:outline-assignment-ind" width="24" height="24" style={{ color: "#000000" }} />
    )
  },
  {
    label: 'Schedules', icon: (
      <Icon icon="uil:calender" width="24" height="24" style={{ color: "#000000" }} />
    )
  },
  {
    label: 'Caseload', icon: (
      <Icon icon="ic:outline-folder-open" width="24" height="24" style={{ color: "#000000" }} />
    )
  },
  {
    label: 'Analytics', icon: (
      <Icon icon="material-symbols:analytics-outline-rounded" width="24" height="24" style={{ color: "#000000" }} />
    )
  },
];

const Sidebar = () => {
  const Navigate = useNavigate();
  return (
    <aside className="h-screen max-w-max flex flex-col bg-white border-r border-[#E9E9E9] justify-between">
      <div className=''>
        {/* Logo */}
        <div className="flex items-center px-8 pt-8 pb-6 cursor-pointer" onClick={() => Navigate('/hospital/dashboard')}>
          <Image src="assets/lavendercare-logo.svg" alt="LavenderCare Logo" className="w-50" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-8">
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className={`flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-[#7B3FE4] text-white' : 'text-[#2D1A4A] hover:bg-[#F3F0FA]'}`}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </span>
              <span className="font-medium text-md">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Settings & Support */}
        <div className="mt-10 flex flex-col gap-2 px-8">
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer text-[#2D1A4A] hover:bg-[#F3F0FA]">
            <span className="w-6 h-6 flex items-center justify-center">
              <Icon icon="material-symbols:settings-outline-rounded" width="24" height="24" style={{ color: "#000000" }} />
            </span>
            <span className="font-medium text-md">Settings</span>
          </div>
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer text-[#2D1A4A] hover:bg-[#F3F0FA]">
            <span className="w-6 h-6 flex items-center justify-center">
              <Icon icon="material-symbols-light:support-agent-outline-rounded" width="24" height="24" style={{ color: "#000000" }} />
            </span>
            <span className="font-medium text-md">Contact support</span>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 py-5 pb-15 flex items-center gap-4 border-t border-[#E9E9E9]">
        <Avatar>
          <AvatarImage src="/assets/Avatar.svg"/>
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        <div className="flex-1">
          <div className="font-bold text-md text-[#2D1A4A]">Jane Doe</div>
          <div className="text-[#7B3FE4] text-sm">johndoe@cloudax.com</div>
        </div>
        <button className="cursor-pointer">
          <Icon icon="solar:logout-outline" width="24" height="24" style={{ color: "red" }} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;