import TopDivider from '@/components/TopDivider';
import React, { useState } from 'react';

const waveformHeights = [8, 12, 6, 14, 10, 16, 5, 18, 9, 13, 7, 15, 11, 17, 8, 12, 6, 14, 10, 16];

export default function ChatSection() {
    const [message, setMessage] = useState('');

    return (
        <div>

            <TopDivider />

            <div className="flex h-screen bg-white rounded-2xl">
                <div className="w-full flex flex-col mx-auto">
                    {/* Header */}
                    <div className="flex items-center px-4 py-3 border-b border-gray-200">
                        <button className="p-2 text-gray-600">
                            {/* Back Arrow */}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="flex-1 text-lg font-medium text-gray-900">Chinenye Okeke</h2>
                        <button className="p-2 text-gray-600">
                            {/* Info Dots */}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-6">
                        {/* 1) Received with reaction */}
                        <div className="max-w-xs">
                            <div className="relative bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-br-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...
                                <span className="absolute -top-2 -right-2 text-sm">🤣👍</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">1:32 PM</div>
                        </div>

                        {/* 2) Sent text */}
                        <div className="flex justify-end max-w-xs ml-auto">
                            <div>
                                <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl rounded-bl-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...
                                </div>
                                <div className="text-xs text-gray-500 mt-1 text-right">1:32 PM</div>
                            </div>
                        </div>

                        {/* 3) Sent Voice Call card */}
                        <div className="flex justify-end max-w-sm ml-auto">
                            <div>
                                <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h2.586l3.707 3.707-3.707 3.707H5a2 2 0 01-2-2V5zm12.657 1.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.896-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <div className="flex-1 text-sm font-medium">Voice Call</div>
                                    <div className="text-xs text-purple-200">30 Secs</div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 text-right">1:32 PM</div>
                            </div>
                        </div>

                        {/* 4) Received Image Placeholder */}
                        <div className="max-w-xs">
                            <div className="bg-gray-100 rounded-2xl h-40 w-full"></div>
                            <div className="text-sm text-gray-900 mt-1">Hello, Good day</div>
                            <div className="text-xs text-gray-500">1:32 PM</div>
                        </div>

                        {/* 5) Received Voice Message */}
                        <div className="max-w-xs">
                            <div className="bg-gray-100 p-3 rounded-2xl rounded-br-sm flex items-center space-x-3">
                                <button className="bg-purple-600 text-white p-2 rounded-full">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.445-10.832L6.555 7.168A1 1 0 006 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className="flex items-center space-x-1 flex-1">
                                    {waveformHeights.map((h, i) => (
                                        <div key={i} className="bg-purple-300 rounded-full" style={{ width: '2px', height: `${h}px` }} />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">0:03</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">1:32 PM</div>
                        </div>

                        {/* 6) Sent File */}
                        <div className="flex justify-end max-w-sm ml-auto">
                            <div>
                                <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6l-6-4H4z" />
                                        </svg>
                                        <span>agreement.pdf</span>
                                    </div>
                                    <span className="text-xs opacity-80">3.5 MB</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 text-right">1:32 PM</div>
                            </div>
                        </div>

                        {/* 7) Sent Video Card */}
                        <div className="flex justify-end max-w-sm ml-auto">
                            <div>
                                <div className="bg-purple-600 text-white p-12 rounded-2xl flex items-center justify-center">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3.5 8l5-3v6l-5-3z" />
                                    </svg>
                                </div>
                                <div className="text-sm text-white mt-1 text-center">Hello …</div>
                                <div className="text-xs text-gray-500 mt-1 text-right">1:32 PM</div>
                            </div>
                        </div>
                    </div>

                    {/* Input Box */}
                    <div className="px-4 py-3 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400">
                                {/* Camera */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 5a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.172l-.828-1H6l-.828 1H4zM10 14a3 3 0 110-6 3 3 0 010 6z" />
                                </svg>
                            </button>
                            <button className="text-gray-400">
                                {/* Plus */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                placeholder="Type a message…"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                                {/* Paper plane */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
