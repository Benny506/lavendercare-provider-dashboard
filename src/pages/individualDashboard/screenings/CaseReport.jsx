import TopDivider from '@/components/TopDivider';
import ProfileImg from '@/components/ui/ProfileImg';
import supabase from '@/database/dbInit';
import { getInterpretation, getRiskLevelBadgeClass } from '@/lib/utilsJsx';
import { appLoadStart, appLoadStop } from '@/redux/slices/appLoadingSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TestInfoModal from './TestInfoModal';
import { Button } from '@/components/ui/button';
import ErrorMsg1 from '@/components/ErrorMsg1';
import ErrorMsg2 from '@/components/ui/ErrorMsg2';
import { getUserDetailsState } from '@/redux/slices/userDetailsSlice';
import { isoToDateTime, sortByTimeStamp } from '@/lib/utils';

const patient = {
    name: "Chinenye Okeke",
    risk: "High",
    age: 29,
    postpartumDay: 21,
    contact: "email@example.com",
    phone: "0801 234 5678",
    pregnancyStatus: "Postpartum",
    screeningType: "Medical Consultation",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    attachment: "Mental Health Report",
};

const latestResult = [
    { field: "Score", value: "24" },
    { field: "Interpretation", value: "Severe Depression" },
    { field: "Submitted on", value: "Jul 12, 2025 - 3:15 PM" },
];

const history = [
    {
        date: "Jul 12, 2025",
        type: "PHQ-9",
        score: "24",
        interpretation: "Severe Depression",
        risk: { label: "Medium", color: "orange" },
    },
    {
        date: "Jun 30, 2025",
        type: "EPDS",
        score: "8",
        interpretation: "Mild Anxiety",
        risk: { label: "High", color: "red" },
    },
    {
        date: "Jun 30, 2025",
        type: "PHQ-9",
        score: "12",
        interpretation: "Severe Depression",
        risk: { label: "Medium", color: "orange" },
    },
];

const CaseReport = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { state } = useLocation()

    const screenings = useSelector(state => getUserDetailsState(state).screenings)

    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
    const [latestScreeningInfo, setLatestScreeningInfo] = useState() 
    const [patientScreeningHistory, setPatientScreeningHistory] = useState()
    const [testInfoModal, setTestInfoModal] = useState({ show: false, data: null })

    const patient_id = state?.patient_id

    useEffect(() => {
        if(!patient_id){
            navigate('/individual/dashboard/screenings')
        
        } else {

            const orderedScreenings = sortByTimeStamp({ arr: screenings, key: 'created_at' })

            const latestScreeningInfo = orderedScreenings[0]

            const p_screeningHistory = orderedScreenings

            if(!latestScreeningInfo){
                const errorMsg = "Error fetching patient information"
                toast.error(errorMsg)
                setApiReqs({ isLoading: false, errorMsg })
            
            } else{
                setPatientScreeningHistory(p_screeningHistory)
                setLatestScreeningInfo(latestScreeningInfo)
            }
        }
    }, [screenings])

    const openTestInfoModal = ({ data }) => setTestInfoModal({ show: true, data })

    if(apiReqs.errorMsg){
        return(
            <ErrorMsg2 
                errorMsg={apiReqs.errorMsg}
            />
        )
    }

    if(!patient_id || !latestScreeningInfo) return <></>
    
    const { 
        user_profile, risk_level, test_date, score, test_type, remark
    } = latestScreeningInfo

    const { 
        name, email, age, is_pregnant, postpartumDay,
        pregnant_months_count, weight, height, country, state: mothersState, profile_img,
        is_first_child, num_kids, is_home_mum, registered_antenatal,
    } = user_profile

    return (
        <div>
            <TopDivider />
            <div className="min-h-screen bg-white flex rounded-lg">
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

                        <div className=''>
                            <Button 
                                onClick={() => navigate('/individual/dashboard/consultation/chat', { state: { user_id: user_profile?.id } })}
                                className={"cursor-pointer bg-primary-600"}
                            >
                                Chat
                            </Button>                                
                        </div>                        
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4">Patient Information</h2>
                        <div className="space-y-3 mb-8 text-sm">
                            {
                                [
                                    { title: "Age", value: age },
                                    { title: "Weight", value: weight ? `${weight}kg` : "not set" },
                                    { title: "Height", value: height ? `${height}ft` : "not set" },
                                    { title: "Contact", value: email },
                                    { title: "Country", value: country },
                                    { title: "State", value: mothersState },
                                    { title: "Works from home", value: is_home_mum ? 'YES' : "NO" },
                                ].map((info, i) => {
                                    const { title, value } = info

                                    return(
                                        <div key={i}>
                                            <span className="font-medium text-gray-600">{title}: </span>
                                            <span className="font-bold">{value || "not set"}</span>
                                        </div>                                     
                                    )
                                })                           
                            }                                                                     
                        </div>
                    </div>

                    <hr className="border-gray-200 mt-8 mb-8" />

                    <div>
                        <h2 className="text-lg font-bold mb-4">Pregnancy Information</h2>
                        <div className="space-y-3 mb-8 text-sm">
                            {
                                [
                                    { title: "Pregnancy Status", value: is_pregnant ? 'Pregnant' : "PostPartum" },
                                    { title: is_pregnant ? "Pregnant months count" : "Postpartum Day", value: is_pregnant ? pregnant_months_count || 'not set' : postpartumDay || 'not set' },
                                    { title: "Number of children", value: num_kids ?? "not set "},
                                    { title: "Registered Antenatal", value: registered_antenatal ? "YES" : "NO" }
                                ].map((info, i) => {
                                    const { title, value } = info

                                    return(
                                        <div key={i}>
                                            <span className="font-medium text-gray-600">{title}: </span>
                                            <span className="font-bold">{value || "not set"}</span>
                                        </div>                                     
                                    )
                                })                           
                            }                                                                     
                        </div>
                    </div>                    

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
                        <p className="text-gray-600 mb-4">{patient.attachment}</p>
                        <button className="bg-purple-100 text-purple-600 px-6 py-2 rounded-lg font-medium">
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
                                        { field: "Risk level", value: risk_level },
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
                                    <th className="text-left py-3 text-gray-600 font-medium">Risk Level</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    patientScreeningHistory.map((history, i) => {

                                        const { test_type, score, created_at } = history

                                        return (
                                            <tr key={i} className="border-b border-gray-100">
                                                <td className="py-3">{isoToDateTime({ isoString: created_at })}</td>
                                                <td className="py-3">{test_type}</td>
                                                <td className="py-3">{score}</td>
                                                <td className="py-3">
                                                    <span className={`${getRiskLevelBadgeClass(risk_level)} px-2 py-1 rounded text-sm`}>
                                                        { risk_level }
                                                    </span>
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