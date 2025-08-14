import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { getUserDetailsState } from "@/redux/slices/userDetailsSlice";
import Image from "./ui/image";
import { Menu } from "lucide-react";

const IndividualTopBar = ({ setIsOpen }) => {

    const userProfile = useSelector(state => getUserDetailsState(state).profile)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="w-full lg:px-6 py-2 flex items-center justify-between relative">
            <div className="flex items-center gap-2">
                {/* Hamburger for mobile */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden"
                >
                    <Menu size={24} />
                </button>
                {/* Left: Page Title */}
                <h1 className="text-2xl font-bold text-[#000000]">Overview</h1>
            </div>

            {/* Right: Search + Notification + Avatar */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap justify-end flex-1">
                {/* Search Bar - hidden on very small screens */}
                <div className="hidden sm:flex items-center px-3 sm:px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 w-full sm:w-[350px]">
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
                        <Icon icon="mdi:notifications-none" width="24" height="24" style={{ color: "#4CAEA0" }} />
                    </div>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                        1
                    </span>
                </div>

                {/* Avatar with Dropdown */}
                <div className="relative cursor-pointer" ref={dropdownRef}>
                    <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <Avatar className="w-10 h-10">
                            {userProfile?.profile_img ? (
                                <img src={userProfile.profile_img} />
                            ) : (
                                <Image src={"/assets/Avatar.svg"} alt="profile" />
                            )}
                        </Avatar>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="flex flex-col items-center p-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Icon icon="mdi:account" className="text-gray-500" width="28" height="28" />
                                </div>
                                <p className="mt-2 font-medium">Hello [ Full name ]</p>
                                <p className="text-sm text-gray-500">Hospital</p>
                            </div>
                            <div className="border-t">
                                <button className="w-full text-left px-4 py-3 text-[#4CAEA0] flex items-center gap-2 hover:bg-gray-100 bg-[#F4F4F5]">
                                    <Icon icon="mdi:plus" width="18" height="18" />
                                    Join Hospital
                                </button>
                            </div>
                            <div className="border-t">
                                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                                    Settings
                                </button>
                            </div>
                            <div className="border-t">
                                <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>

    );
};

export default IndividualTopBar;
