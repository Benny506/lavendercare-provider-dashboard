import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import AppLoading from '@/components/appLoading/AppLoading';
import supabase from '@/database/dbInit';
import { useSelector } from 'react-redux';
import { getUserDetailsState } from '@/redux/slices/userDetailsSlice';
import { isoToDateTime } from '@/lib/utils';
import ErrorMsg2 from '@/components/ui/ErrorMsg2';
import { getRiskLevelBadge } from '@/lib/utilsJsx';
import ZeroItems from '@/components/ui/ZeroItems';

const TestInfoModal = ({ show, onClose, data }) => {

    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null })
    const [testQuestions, setTestQuestions] = useState([])

    useEffect(() => {
        if(data){
            fetchTestResults({ answer: data?.answer })
        }
    }, [data])

    const fetchTestResults = async ({ answer }) => {
        try {
            
            setApiReqs({ isLoading: true, errorMsg: null })

            const questionIds = answer?.map(ans => ans.question_id)

            const { data: questions, error } = await supabase
                .from('questions')
                .select('*')
                .in("id", questionIds)

            if(error){
                console.log(error)
                throw new Error()
            }

            const groupedQuestions = questions.map((ques => {
                const _answer = answer.filter(ans => ans.question_id == ques.id).map(ans => ans.answer)[0]

                return {
                    ...ques,
                    answer: _answer
                }
            }))

            setTestQuestions(groupedQuestions)

            setApiReqs({ isLoading: false, errorMsg: null })
            
        } catch (error) {
            console.log(error)
            return fetchReportDataFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const fetchReportDataFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg: null })
        toast.error(errorMsg)

        return
    }

    const closeModal = () => {
        setTestQuestions([])
        onClose && onClose()

        return;
    }

    if (!show || !data) return null;
    
    const { test_date, user_id, score, risk_level } = data

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">

            {
                apiReqs.isLoading
                &&
                    <AppLoading tempLoading={true} />
            }

            <div className="bg-img rounded-xl p-4 w-full h-full max-h-[80vh] max-w-[60vw]  shadow-xl relative">
                <div className="bg-white rounded-2xl shadow-xl w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between p-6 pb-4">
                        <button 
                            onClick={closeModal}
                            className="flex cursor-pointer items-center text-purple-600 font-medium"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>
                        
                        <div>
                            <p className='text-base m-0 p-0 mb-1 text-end text-right fw-500 text-000'>
                                { isoToDateTime({ isoString: new Date(test_date).toISOString() }) }
                            </p>
                            <p className='text-base m-0 p-0  mb-1 text-end text-right fw-500 text-000'>
                                Score: { score }
                            </p>
                            <div className='text-base m-0 p-0 text-end text-right fw-500 text-000'>
                                Risk level: { getRiskLevelBadge(risk_level) }
                            </div>                                                        
                        </div>
                    </div>       

                    <div style={{ overflowY: 'auto' }}>
                        <div className="flex flex-col">

                            <div className='p-6'>
                                {
                                    apiReqs.errorMsg
                                    ?
                                        <ErrorMsg2 
                                            errorMsg={apiReqs.errorMsg}
                                        />
                                    :
                                    testQuestions?.length > 0
                                    ?
                                        <div>
                                            {
                                                testQuestions.map((ques, i) => {
                                                    const { prompt, type, options, answer } = ques

                                                    return(
                                                        <div
                                                            key={i}
                                                            className='mb-6'
                                                        >
                                                            <div className='flex items-start gap-1 mb-3'>
                                                                <p className='m-0 p-0 text-xl txt-000 fw-900 txt-15'>
                                                                    {i+1}.
                                                                </p>

                                                                <p className='m-0 p-0 text-xl txt-000 fw-500 txt-15'>
                                                                    { prompt }
                                                                </p>
                                                            </div>

                                                            <div>
                                                                {
                                                                    options?.map((opt, optIndex) => {
                                                                        const { label, value } = opt

                                                                        const isAnswer = value == answer ? true : false

                                                                        return(
                                                                            <div
                                                                                key={optIndex}
                                                                                className='mb-1 flex items-center gap-4'
                                                                            >
                                                                                <p className='m-0 p-0 text-sm txt-000 fw-500 txt-15'>
                                                                                    {label}
                                                                                </p>

                                                                                {
                                                                                    isAnswer
                                                                                    &&
                                                                                        <CheckCircle 
                                                                                            size={20}
                                                                                            color='#6F3DCB'
                                                                                        />
                                                                                }
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    :
                                        <ZeroItems
                                            zeroText={"Questions will appear here"}
                                        />                                
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestInfoModal;