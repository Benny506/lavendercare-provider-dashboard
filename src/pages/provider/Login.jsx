import { Button } from "@/components/ui/button";
import ProfileCard from "../../components/ProfileCard";
import ProviderAccount from "../../components/ProviderAccount";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [providerOption, setProviderOption] = useState('individual')

  const handleContinue = () => {
    if (providerOption == 'individual') navigate('/individual', { state: providerOption });

    if (providerOption == 'hospital') navigate('hospital-provider', { state: providerOption });

    return;
  };

  return (
    <div className="bg-img min-h-screen">
    <Navbar />
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 py-16">
      <div className="hidden md:block absolute top-8 right-10">
        <ProviderAccount />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 -mt-16 md:mt-0">
        <h1 className="font-bold mb-2 text-4xl text-center gray-text-800">LavenderCare For Providers</h1>
        <p className="text-center gray-text-500">Select the option that best describe you</p>
        <p className="text-center gray-text-500 mt-2">Join a network that’s bridging the gap in postpartum care. Earn, work flexibly, and bring structure to your practice</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <ProfileCard
          icon="ph:hospital-light"
          title="I am an Organization/Hospital"
          providerOption={providerOption}
          setProviderOption={() => {}}
          type="hospital"
          extraStyles={{
            opacity: 0.5,
            cursor: 'default'
          }}
        />
        <ProfileCard
          icon="ph:hand-heart-light"
          title="I am an Individual Provider"
          providerOption={providerOption}
          setProviderOption={setProviderOption}
          type="individual"
        />
      </div>
      <div className="block md:hidden">
        <ProviderAccount className="mx-auto justify-center"/>
      </div>
      <div className="flex items-center justify-center md:mt-6">
        <Button
          className="w-full max-w-xs md:max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white px-6 py-7 cursor-pointer"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Login;