import { Icon } from '@iconify/react';

const ProfileCard = ({ title, icon }) => {
    return (
        <div
            className="flex flex-col justify-between w-[22rem] h-[11rem] p-6 border border-gray-300 rounded-lg cursor-pointer bg-transparent"
        >
            <div className="flex justify-between items-start mt-2">
                <Icon icon={icon} width={24} height={24} className="text-gray-800" />
                <Icon
                    icon="mdi:checkbox-blank-circle-outline"
                    width={20}
                    height={20}
                    className="text-[#666666]"
                />
            </div>
            <p className="text-[21px] font-semibold gray-text-800 mb-14 text-start mt-2">
                {title}
            </p>
        </div>
    )
}

export default ProfileCard
