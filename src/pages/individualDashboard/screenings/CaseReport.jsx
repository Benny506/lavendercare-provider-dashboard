import TopDivider from '@/components/TopDivider';
import ProfileImg from '@/components/ui/ProfileImg';
import supabase from '@/database/dbInit';
import { getInterpretation, getRiskLevelBadgeClass } from '@/lib/utilsJsx';
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TestInfoModal from './TestInfoModal';
import { Button } from '@/components/ui/button';
import ErrorMsg1 from '@/components/ErrorMsg1';
import ErrorMsg2 from '@/components/ui/ErrorMsg2';
import { getUserDetailsState } from '@/redux/slices/userDetailsSlice';
import { getMaxByKey, isoToDateTime, sortByTimeStamp } from '@/lib/utils';
import { useReactToPrint } from 'react-to-print';
import ZeroItems from '@/components/ui/ZeroItems';
import PatientInfo from './auxiliary/PatientInfo';

const CaseReport = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { state } = useLocation()   

    const screenings = useSelector(state => getUserDetailsState(state).screenings)

    const containerRef = useRef(null)

    const exportElementToPdf = useReactToPrint({
        contentRef: containerRef
    });        

    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
    const [latestScreeningInfo, setLatestScreeningInfo] = useState() 
    const [patientScreeningHistory, setPatientScreeningHistory] = useState()
    const [testInfoModal, setTestInfoModal] = useState({ show: false, data: null })

    const patient_id = state?.patient_id

    useEffect(() => {
        if(!patient_id){
            navigate('/individual/dashboard/screenings')
        
        } else {

            const patientScreenings = (screenings || []).filter(s => s.user_id == patient_id)

            // const patientScreenings = sortByTimeStamp({ arr: patientScreenings, key: 'created_at' })

            const latestScreeningInfo = patientScreenings[0]

            const p_screeningHistory = patientScreenings

            if(!latestScreeningInfo){
                const errorMsg = "Error fetching patient information"
                setApiReqs({ isLoading: false, errorMsg })
            
            } else{
                setPatientScreeningHistory(p_screeningHistory)
                setLatestScreeningInfo(latestScreeningInfo)
            }
        }
    }, [screenings])

    const openTestInfoModal = ({ data }) => setTestInfoModal({ show: true, data })

    if(apiReqs.errorMsg){
        if(screenings?.length > 0){
            return (
                <div
                    style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', gap: '15px',
                        height: '100%', flexGrow: 1                        
                    }}                    
                >
                    <ZeroItems zeroText={'No screening info found'} />
                </div>
            )
        }

        return(
            <ErrorMsg2 
                errorMsg={apiReqs.errorMsg}
            />
        )
    }    

    if(!patient_id || !latestScreeningInfo) return <></>
    
    const { 
        user_profile, risk_level, test_date, score, test_type, remark, answer
    } = latestScreeningInfo

    const { 
        name, email, age, is_pregnant, postpartumDay,
        pregnant_months_count, weight, height, country, state: mothersState, profile_img,
        is_first_child, num_kids, is_home_mum, registered_antenatal,
    } = user_profile

    return (
        <div>
            <TopDivider />
            <div ref={containerRef} className="min-h-screen bg-white flex rounded-lg">
                {/* Left Sidebar */}
                <div className="w-1/3 p-6 border-r border-gray-200">
                    {/* Patient Header */}
                    <div className='mb-6 flex items-start justify-between gap-3 w-full'>
                        <div className="flex items-start">
                            <div className="p-2 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                                <ProfileImg 
                                    profile_img={profile_img}
                                    width={"20px"} 
                                    height={"20px"}
                                    name={name}
                                />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold">{name}</h1>
                                <span className={`${getRiskLevelBadgeClass(risk_level)} px-2 py-1 rounded text-sm font-medium`}>
                                    {risk_level}
                                </span>
                            </div>                      
                        </div>                        
                    </div>

                    <PatientInfo 
                        patient={user_profile}
                    />                   

                    {/* <div className="text-sm mb-8">
                        <span className="font-bold">Screening Type: </span>
                        <span className="text-gray-500">{patient.screeningType}</span>
                    </div>
                    <hr className="border-gray-200 mb-6" />
                    <h3 className="font-bold mb-4">Session Summary & Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <p className="text-sm text-gray-600">{patient.summary}</p>
                    </div>
                    <h3 className="font-bold mb-4">Attachments & Reports</h3> */}
                    <div className="mb-6">
                        <button onClick={exportElementToPdf} className="cursor-pointer bg-purple-100 text-purple-600 px-6 py-2 rounded-lg font-medium">
                            Download PDF
                        </button>
                    </div>
                </div>
                {/* Right Content */}
                <div className="flex-1 p-6">
                    <h2 className="text-xl font-bold mb-6">Latest Result Summary</h2>
                    <div className="bg-white rounded-lg p-6 mb-8">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left w-1/3 py-3 text-gray-600 font-medium">Field</th>
                                    <th className="text-left w-2/3 py-3 text-gray-600 font-medium">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [
                                        { field: "Score", value: score },
                                        { field: "Test type", value: test_type },
                                        { field: "Risk level (Score)", value: risk_level },
                                        { field: "Max Risk % (Answer)", value: `${getMaxByKey({ arr: answer?.filter(ans => ans.alert_level == 'high' || ans?.alert_level == 'severe'), key: 'risk_level' })?.risk_percent}%` },
                                        { field: "Interpretation", value: remark },
                                        { field: "Submitted on", value: new Date(test_date).toDateString() },                                        
                                        { field: "Test Info", value: "View", callBack: ({ data }) => openTestInfoModal({ data }) },                                        
                                    ]
                                    .map(({ field, value, callBack }) => (
                                        <tr key={field} className="border-b border-gray-100">
                                            <td className="py-3 font-medium">{field}</td>
                                            {
                                                callBack
                                                ?
                                                    <td className="py-3">
                                                        <button 
                                                            onClick={() => callBack({ data: latestScreeningInfo })}
                                                            className="cursor-pointer bg-purple-100 text-purple-600 px-6 py-2 rounded-lg font-medium"
                                                        >
                                                            { value }
                                                        </button>
                                                    </td>
                                                :
                                                    <td className="py-3">{value}</td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <h2 className="text-xl font-bold mb-6">Full Screening History Table</h2>
                    <div className="bg-white rounded-lg p-6">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">Type</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">Score</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">Risk Level (Score)</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">Max Risk % (Answer)</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    patientScreeningHistory.map((history, i) => {

                                        const { test_type, score, created_at, answer, risk_level } = history

                                        const max_risk_percent = getMaxByKey({ arr: answer?.filter(ans => ans.alert_level == 'high' || ans?.alert_level == 'severe'), key: 'risk_level' })                                        

                                        return (
                                            <tr key={i} className="border-b border-gray-100">
                                                <td className="py-3">{isoToDateTime({ isoString: created_at })}</td>
                                                <td className="py-3">{test_type}</td>
                                                <td className="py-3">{score}</td>
                                                <td className="py-3">
                                                    <span className={`${getRiskLevelBadgeClass(risk_level?.toLowerCase())} px-2 py-1 rounded text-sm`}>
                                                        { risk_level }
                                                    </span>
                                                </td>
                                                <td className="py-3 text-center">
                                                    { max_risk_percent?.risk_percent }%
                                                </td>                                                  
                                                <td className="py-3">
                                                    <button
                                                        onClick={() => openTestInfoModal({ data: history })}
                                                        className="cursor-pointer bg-purple-100 text-purple-600 px-6 py-2 rounded-lg font-medium"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <TestInfoModal 
                show={testInfoModal.show}
                data={testInfoModal.data}
                onClose={() => setTestInfoModal({ show: false, data: null })}
            />
        </div>
    )
};

export default CaseReport;