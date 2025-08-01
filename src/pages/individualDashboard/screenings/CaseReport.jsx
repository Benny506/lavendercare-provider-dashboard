import TopDivider from '@/components/TopDivider';
import React from 'react';

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

const CaseReport = () => (
    <div>
        <TopDivider />
        <div className="min-h-screen bg-white flex rounded-lg">
            {/* Left Sidebar */}
            <div className="w-1/3 p-6 border-r border-gray-200">
                {/* Patient Header */}
                <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{patient.name}</h1>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                            {patient.risk}
                        </span>
                    </div>
                </div>
                <h2 className="text-lg font-bold mb-4">Patient Information</h2>
                <div className="space-y-3 mb-8 text-sm">
                    <div>
                        <span className="font-medium text-gray-600">Age: </span>
                        <span className="font-bold">{patient.age}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Postpartum Day: </span>
                        <span className="font-bold">{patient.postpartumDay}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Contact: </span>
                        <span className="font-bold">{patient.contact}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Phone no </span>
                        <span className="font-bold">{patient.phone}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Pregnancy Status: </span>
                        <span className="font-bold">{patient.pregnancyStatus}</span>
                    </div>
                </div>
                <div className="text-sm mb-8">
                    <span className="font-bold">Screening Type: </span>
                    <span className="text-gray-500">{patient.screeningType}</span>
                </div>
                <hr className="border-gray-200 mb-6" />
                <h3 className="font-bold mb-4">Session Summary & Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                    <p className="text-sm text-gray-600">{patient.summary}</p>
                </div>
                <h3 className="font-bold mb-4">Attachments & Reports</h3>
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
                                <th className="text-left py-3 text-gray-600 font-medium">Field</th>
                                <th className="text-left py-3 text-gray-600 font-medium">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestResult.map(({ field, value }) => (
                                <tr key={field} className="border-b border-gray-100">
                                    <td className="py-3 font-medium">{field}</td>
                                    <td className="py-3">{value}</td>
                                </tr>
                            ))}
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
                                <th className="text-left py-3 text-gray-600 font-medium">Interpretation</th>
                                <th className="text-left py-3 text-gray-600 font-medium">Risk Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((row, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                    <td className="py-3">{row.date}</td>
                                    <td className="py-3">{row.type}</td>
                                    <td className="py-3">{row.score}</td>
                                    <td className="py-3">{row.interpretation}</td>
                                    <td className="py-3">
                                        <span className={`bg-${row.risk.color}-100 text-${row.risk.color}-600 px-2 py-1 rounded text-sm`}>
                                            {row.risk.label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default CaseReport;