import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@iconify/react';
import TopDivider from '@/components/TopDivider';

const IndividualProfilePage = () => {
    return (
        <div>
            <TopDivider />
            <div className="min-h-screen bg-gray-50 p-8 flex justify-start items-start w-full flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-8 w-full">
                    <div className="flex items-start space-x-4">
                        <div className="relative">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-gray-300 text-gray-600 text-2xl font-medium">
                                    P
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                <Icon icon="material-symbols:photo-camera" className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Hello, Prince!</h1>
                            <p className="text-gray-600">Obstetrics</p>
                        </div>
                    </div>
                    <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        <span>Edit</span>
                        <Icon icon="material-symbols:edit" className="w-4 h-4" />
                    </button>
                </div>

                <div className='flex flex-col gap-6 w-2xl'>
                    {/* Professional Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Professional Title
                        </label>
                        <div className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg">
                            Certified Lactation Consultant
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Bio
                        </label>
                        <textarea
                            className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder=""
                        />
                    </div>

                    {/* Full name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Full name
                        </label>
                        <input
                            type="text"
                            value="Prince olorunfemi"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Email
                        </label>
                        <input
                            type="email"
                            value="Prince@gmail.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Phone number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Phone number
                        </label>
                        <div className="flex">
                            <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                                <Icon icon="twemoji:flag-nigeria" className="w-6 h-6 mr-2" />
                                <span className="text-gray-600 text-sm">+234</span>
                                <Icon icon="material-symbols:keyboard-arrow-down" className="w-4 h-4 text-gray-400 ml-1" />
                            </div>
                            <input
                                type="tel"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Password
                        </label>
                        <input
                            type="password"
                            value="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualProfilePage;