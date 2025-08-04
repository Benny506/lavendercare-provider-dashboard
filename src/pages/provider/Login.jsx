import { Button } from "@/components/ui/button";
import ProfileCard from "../../components/ProfileCard";
import ProviderAccount from "../../components/ProviderAccount";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [providerOption, setProviderOption] = useState('individual')

  const handleContinue = () => {
    if(providerOption == 'individual') navigate('/individual', { state: providerOption });

    if(providerOption == 'hospital') navigate('hospital-provider', { state: providerOption });

    return;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 py-16">
      <div className="absolute top-8 right-10">
        <ProviderAccount />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold mb-2 text-4xl text-center gray-text-800">Create your Provider Profile</h1>
        <p className="text-center gray-text-500">Become a lavendercare Provider account, First</p>
        <p className="text-center gray-text-500 -mt-2">Choose your option</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <ProfileCard
          icon="ph:hospital-light"
          title="Are you a Hospital Admin"
          providerOption={providerOption}
          setProviderOption={setProviderOption}  
          type="hospital"        
        />
        <ProfileCard
          icon="ph:hand-heart-light"
          title="Are you an Individual Provider"
          providerOption={providerOption}
          setProviderOption={setProviderOption}
          type="individual"
        />
      </div>
      <div className="flex items-center justify-center mt-6">
        <Button
          className="w-full max-w-md bg-primary-600 outline-none border-none rounded-4xl text-white px-6 py-7 cursor-pointer"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Login;