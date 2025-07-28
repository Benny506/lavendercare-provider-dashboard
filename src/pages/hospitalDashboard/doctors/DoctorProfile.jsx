import DoctorProfileSidebar from '@/components/DoctorProfileSidebar';
import TopDivider from '@/components/TopDivider';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import React from 'react'

const DoctorProfile = () => {
    const doctorData = {
        name: "Dr Grace Bello",
        specialty: "OB-GYN",
        phone: "+234810081728",
        email: "Hazelnutt@gmail.com",
        licenseNo: "0123456789"
    };

    const recentActivity = [
        {
            date: "07-July",
            motherName: "Sarah Adebayo",
            careType: "Medical Consultation",
            status: "Ongoing",
            statusColor: "text-green-600 bg-green-50"
        },
        {
            date: "06-July",
            motherName: "Chinenje Okeke",
            careType: "Mental Health Support",
            status: "Attended",
            statusColor: "text-primary-600 bg-purple-50"
        },
        {
            date: "05-July",
            motherName: "Fatima Musa",
            careType: "Physical Recovery",
            status: "Attended",
            statusColor: "text-primary-600 bg-purple-50"
        }
    ];

    const reviews = [
        {
            id: 1,
            name: "Hope O.",
            date: "12/07/2025",
            rating: 4.5,
            careType: "Medical Consultation",
            review: "This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit."
        },
        {
            id: 2,
            name: "Hope O.",
            date: "08/07/2025",
            rating: 4.5,
            size: "L",
            color: "BLUE",
            review: "This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit."
        },
        {
            id: 3,
            name: "Hope O.",
            date: "12/12/2024",
            rating: 4.5,
            size: "L",
            color: "BLUE",
            review: "This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit."
        },
        {
            id: 4,
            name: "Hope O.",
            date: "12/12/2024",
            rating: 4.5,
            size: "L",
            color: "BLUE",
            review: "This is a review of the product. This review will have a character limit. The date I propose This review will have a character limit."
        }
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Icon
                        key={i}
                        icon={
                            i < fullStars
                                ? "ph:star-fill"
                                : i === fullStars && hasHalfStar
                                    ? "ph:star-half-fill"
                                    : "ph:star"
                        }
                        className={`w-4 h-4 ${i < fullStars || (i === fullStars && hasHalfStar)
                                ? 'text-orange-400'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <TopDivider />


            <div className="min-h-screen p-6">

                <div className="flex max-w-max mx-auto">
                    {/* Profile Card Component */}
                    <DoctorProfileSidebar
                        doctor={doctorData}
                    />

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-r-lg p-6 shadow-sm border border-gray-200">
                        {/* Recent Activity Section */}
                        <div className="mb-8 border border-gray-200 rounded-lg p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-4 border-b w-full pb-5">
                                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                                <Button className="bg-transaprent shadow-none cursor-pointer text-primary-600 font-extrabold flex items-center gap-1">
                                    View all Consultation
                                    <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                                            <th className="pb-3 font-medium">Date</th>
                                            <th className="pb-3 font-medium">Mother's name</th>
                                            <th className="pb-3 font-medium">Care Type</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentActivity.map((activity, index) => (
                                            <tr key={index} className="border-b border-gray-100">
                                                <td className="py-4 text-sm text-gray-900">{activity.date}</td>
                                                <td className="py-4 text-sm text-gray-900">{activity.motherName}</td>
                                                <td className="py-4 text-sm text-gray-900">{activity.careType}</td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                                                        {activity.status}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <Button className="bg-primary-600 text-white px-4 py-1 rounded-3xl text-sm font-medium transition-colors">
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Patient Review Section */}
                        <div className="mb-8 border border-gray-200 rounded-lg p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Patient Review <span className="text-gray-500 font-normal">( 12 Reviews)</span>
                                </h2>
                            </div>

                            {/* Review Controls */}
                            <div className="flex items-center justify-between mb-6 py-5 px-5 bg-gray-200 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        {/* <span className="text-sm text-gray-600"></span> */}
                                        <select className="text-md font-bold py-3 px-2 rounded-md text-gray-900 bg-gray-50 border border-gray-200 focus:outline-none focus:border-none">
                                            <option>Sort by: 5 stars</option>
                                        </select>
                                    </div>
                                    <span className="text-sm text-gray-600">12 Reviews</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900">4.5</span>
                                    <span className="text-xl text-gray-500">/5</span>
                                    {renderStars(4.5)}
                                </div>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-gray-900">{review.name}</span>
                                                    <span className="text-sm text-gray-500">{review.date}</span>
                                                </div>
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>

                                        {review.careType && (
                                            <p className="text-sm text-gray-600 mb-2">
                                                <span className="font-medium">Care Type:</span> {review.careType}
                                            </p>
                                        )}

                                        {(review.size || review.color) && (
                                            <p className="text-sm text-gray-600 mb-2">
                                                <span className="font-medium">Size:</span> {review.size} | <span className="font-medium">Colour:</span> {review.color}
                                            </p>
                                        )}

                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {review.review}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* See More Reviews */}
                            <div className="text-center mt-8">
                                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                    See more Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile