import { ArrowLeft } from "lucide-react";
import PatientInfo from "../../screenings/auxiliary/PatientInfo";
import ProfileImg from "@/components/ui/ProfileImg";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import supabase from "@/database/dbInit";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsState, setUserDetails } from "@/redux/slices/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import { appLoadStart, appLoadStop } from "@/redux/slices/appLoadingSlice";

export default function SummaryNotesModal({ closeModal, visible, booking }){
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const bookings = useSelector(state => getUserDetailsState(state).bookings)

    const [summary_note, set_summary_note] = useState(booking?.summary_note || '')
    const [prescription_note, set_prescription_note] = useState(booking?.prescription_note || '')

    const isOnGoing = booking?.status == 'ongoing' ? true : false

    const updateSummaryNote = async () => {
        try {

            dispatch(appLoadStart())

            const { data, error } = await supabase
                .from('bookings')
                .update({
                    summary_note,
                    prescription_note
                })
                .eq('id', booking?.id)
                .select()
                .single()

            if(error){
                console.log(error)
                throw new Error()
            }

            const updatedBookings = (bookings || []).map(b => {
                if(b?.id == booking?.id){
                    return {
                        ...b,
                        summary_note,
                        prescription_note
                    }
                }

                return b
            })

            dispatch(setUserDetails({ bookings: updatedBookings }))

            closeModal()

            toast.success("Session information saved")

            return;
            
        } catch (error) {
            console.log(error)
            toast.error("Error marking this session as completed! Try again by clicking the save button below. If the error persists, reach out to support for further steps")
        
        } finally{
            dispatch(appLoadStop())
        }
    }

    if(!closeModal || !visible || !booking) return <></>

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

                        <div>
                            <h1 className="m-0 p-0 txt-000 fw-700 mb-2">
                                Session Info
                            </h1>
                        </div>                  
                    </div>       

                    <div style={{ overflowY: 'auto' }} className="p-6">
                        <div className="mb-5">
                            <p className="m-0 p-0 mb-2 text-gray-600 text-sm">
                                Session note
                            </p>
                            <textarea
                                disabled={isOnGoing ? false : true}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Session notes"
                                value={summary_note}
                                onChange={e => set_summary_note(e.target.value)}
                                style={{
                                    minWidth: '100%',
                                    minHeight: '50vh'
                                }}
                            /> 
                        </div>

                        <div className="mb-5">
                            <p className="m-0 p-0 mb-2 text-gray-600 text-sm">
                                Prescription note
                            </p>
                            <textarea
                                disabled={isOnGoing ? false : true}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Prescription notes"
                                value={prescription_note}
                                onChange={e => set_prescription_note(e.target.value)}
                                style={{
                                    minWidth: '100%',
                                    minHeight: '30vh'
                                }}
                            />                         
                        </div>

                        {
                            isOnGoing
                            &&
                                <div className="flex items-center justify-center">
                                    <Button
                                        onClick={updateSummaryNote}
                                        className={"w-2/3 py-6 mt-5 bg-primary-600"}
                                    >
                                        Save
                                    </Button>                       
                                </div>                            
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}