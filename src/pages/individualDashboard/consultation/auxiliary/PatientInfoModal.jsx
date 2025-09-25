import { ArrowLeft } from "lucide-react";
import PatientInfo from "../../screenings/auxiliary/PatientInfo";
import ProfileImg from "@/components/ui/ProfileImg";

export default function PatientInfoModal({ closeModal, visible, patient }){

    if(!closeModal || !visible || !patient) return <></>

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">

            {/* {
                apiReqs.isLoading
                &&
                    <AppLoading tempLoading={true} />
            } */}

            <div className="bg-img rounded-xl p-4 w-full h-full max-h-[80vh] lg:w-[60vw] w-[95vw]  shadow-xl relative">
                <div className="bg-white rounded-2xl shadow-xl w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between p-6 pb-4">
                        <div>
                            <button 
                                onClick={closeModal}
                                className="flex mb-2 cursor-pointer items-center text-purple-600 font-medium"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back
                            </button>
                        </div>

                        <ProfileImg 
                            profile_img={patient?.profile_img}
                            width={'40px'}
                            height={'40px'}
                            name={patient?.name}
                            containerClass={'w-12 h-12'}
                        />                    
                    </div>       

                    <div style={{ overflowY: 'auto' }} className="p-6">
                        <PatientInfo 
                            patient={patient}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}