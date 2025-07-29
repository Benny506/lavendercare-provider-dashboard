import React from "react";
import { Icon } from "@iconify/react";
import ProviderAccount from "@/components/ProviderAccount";
import { useNavigate } from "react-router-dom";

const specializations = [
    "Obstetrics",
    "Mental Health Support",
    "Physical Recovery",
    "Pelvic Health",
    "Maternal Mental Health",
    "Lactation Support",
    "Family Planning",
    "Fertility Support",
    "Postpartum Doula Services",
];

const ProfileDetails = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center overflow-x-hidden">
            <div className="absolute top-8 right-10 z-10">
                <ProviderAccount />
            </div>
            <div className="w-full max-w-lg bg-white rounded-2xl px-8 py-10 flex flex-col items-center shadow-none">
                <h1 className="text-2xl font-bold mb-1 text-left w-full">Individual Provider Sign Up</h1>
                <p className="mb-6 text-left text-gray-700 w-full text-sm">
                    This step ensures LavenderCare has verified contact and location details for legal and operational purposes.
                </p>
                <form className="w-full flex flex-col gap-4">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-start mb-2">
                        <div className="font-semibold mb-1">Profile Picture</div>
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
                                <Icon icon="mdi:account-circle-outline" className="text-4xl text-gray-400" />
                            </span>
                        </div>
                    </div>
                    {/* Professional Title */}
                    <div>
                        <div className="font-semibold mb-1">Professional Title</div>
                        <input type="text" placeholder='e.g., "Certified Lactation Consultant", "Doula", "OB-GYN"' className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
                    </div>
                    {/* Bio / Professional Summary */}
                    <div>
                        <div className="font-semibold mb-1">Bio / Professional Summary</div>
                        <input type="text" placeholder="Describe your experience -300 characters" className="border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary-200" readOnly />
                    </div>
                    {/* Specializations */}
                    <div>
                        <div className="font-semibold mb-1">Specializations (Multi-select)</div>
                        <div className="flex flex-col gap-2 mt-1">
                            {specializations.map((item) => (
                                <label key={item} className="flex items-center gap-2 select-none">
                                    <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" disabled />
                                    <span className="text-base">{item}</span>
                                </label>
                            ))}
                            <div className="text-xs text-gray-500 mt-1 mb-2">Others</div>
                        </div>
                    </div>
                    {/* Next Button */}
                    <button onClick={() => navigate('/individual/credentials')} type="button" className="bg-primary-600 text-white rounded-full py-3 font-semibold text-lg mt-4 hover:bg-primary-700 transition w-full flex items-center justify-center gap-2">
                        Next <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
                    </button>
                    {/* Skip link */}
                    <div className="flex justify-between items-center w-full mt-2">
                        <button type="button" className="text-primary-600 font-semibold text-base bg-transparent px-0 py-0 hover:underline">Skip</button>
                        {/* Pagination dots */}
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-primary-200 inline-block"></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileDetails;
