import { Icon } from '@iconify/react';

const ProfileCard = ({ title, subTitle, icon, type, providerOption, setProviderOption, extraStyles = {} }) => {

    const selected = providerOption == type ? true : false

    return (
        <div
            onClick={() => setProviderOption && setProviderOption(type)}
            className="flex flex-col justify-between w-[22rem] h-[11rem] p-6 border border-gray-300 rounded-lg cursor-pointer bg-transparent"
            style={{
                ...extraStyles
            }}
        >
            <div className="flex justify-between items-start mt-2">
                <Icon icon={icon} width={24} height={24} className="text-gray-800" />
                <Icon
                    icon={selected ? "ic:baseline-circle" : "mdi:checkbox-blank-circle-outline"}
                    width={20}
                    height={20}
                    color={selected ? "#6F3DCB" : '#666666'}
                />
            </div>
            <p className="text-[21px] font-semibold gray-text-800 mb-14 lg:text-start text-center mt-6 md:mt-2">
                {title}
                <br />
                {subTitle}
            </p>
        </div>
    )
}

export default ProfileCard
