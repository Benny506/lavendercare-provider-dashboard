import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "./ui/image";
// import { IconifyIcon } from "@iconify/react";

const TopBar = () => {
    return (
        <header className="w-full px-6 py-2 flex items-center justify-between">
            {/* Left: Page Title */}
            <h1 className="text-2xl font-bold text-[#000000]">Overview</h1>

            {/* Right: Search + Notification + Avatar */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 w-[350px]">
                    <Icon icon="iconamoon:search" className="text-lg text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search Doctors, case..."
                        className="outline-none bg-transparent w-full text-sm text-gray-600 placeholder:text-gray-400 py-1.5"
                    />
                </div>

                {/* Notification Icon with Badge */}
                <div className="relative cursor-pointer">
                    <div className="p-2 rounded-sm border border-[#E3E3E3]">
                        <Icon icon="mdi:notifications-none" width="24" height="24" style={{ color: "#000000" }} />
                    </div>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                        1
                    </span>
                </div>

                {/* Avatar with Alert */}
                <div className="relative cursor-pointer">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="/assets/Avatar.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Image src="assets/vector.svg" className="absolute -bottom-3 -right-2 text-white w-7 h-7 flex items-center justify-center" />
                    {/* <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            !
          </span> */}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
