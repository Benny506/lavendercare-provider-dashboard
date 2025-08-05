import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const PatientModal = ({ show, onClose, data }) => {
  if (!show || !data) return null;

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
        <div className="bg-img rounded-xl p-4 w-full max-w-md shadow-xl relative">
            <div className="bg-white rounded-2xl shadow-xl w-full flex flex-col max-h-180" style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>
                {`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>
            <div className="hide-scrollbar flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4">
                    <button 
                        onClick={onClose}
                        className="flex items-center text-purple-600 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.riskLevel === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-700'}`}>
                        {data.riskLevel}
                    </span>
                </div>

                {/* Patient Avatar and Info */}
                <div className="px-6 pb-6">
                    <div className="flex items-start mb-6">
                        <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-6">Patient Info</h2>

                    <div className="space-y-4 mb-8">
                        <div>
                            <span className="font-semibold">Mother's name: </span>
                            <span className="text-gray-500">{data.clientName}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Screening Type: </span>
                            <span className="text-gray-500">{data.type}</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-4">Latest Result Summary</h3>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-sm text-gray-600">Field</div>
                            <div className="text-sm text-gray-600">Value</div>
                            <div className="font-medium">Score</div>
                            <div className="font-medium">{data.score}</div>
                            <div className="font-medium">Interpretation</div>
                            <div className="font-medium">{data.interpretation}</div>
                            <div className="font-medium">Submitted on</div>
                            <div className="font-medium">{data.submissionDate}</div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-4">Full Screening History Table</h3>

                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-sm text-gray-600">Field</div>
                            <div className="text-sm text-gray-600">Value</div>
                            <div className="font-medium">Score</div>
                            <div className="font-medium">{data.score}</div>
                            <div className="font-medium">Interpretation</div>
                            <div className="font-medium">{data.interpretation}</div>
                            <div className="font-medium">Submitted on</div>
                            <div className="font-medium">{data.submissionDate}</div>
                        </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-medium">
                        Download Full Case Report
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
);
};

export default PatientModal;