import React from 'react';
import { FaUsers, FaRocket, FaBell } from 'react-icons/fa';

const Agents = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto fles justify-center items-center">
                {/* Icon */}


                {/* Main Heading */}
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    Agents Portal
                </h1>

                {/* Coming Soon Badge */}
                <div className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-semibold text-lg mb-6">
                    🚀 Coming Soon
                </div>

                {/* Description */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    We're working on something amazing! Our dedicated agents portal will provide
                    powerful tools and resources to help travel agents manage bookings,
                    track commissions, and serve customers better.
                </p>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-blue-600 mb-3">
                            <FaUsers className="w-8 h-8 mx-auto" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Agent Dashboard</h3>
                        <p className="text-gray-600 text-sm">Comprehensive dashboard for managing all your bookings</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-blue-600 mb-3">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Commission Tracking</h3>
                        <p className="text-gray-600 text-sm">Real-time tracking of earnings and commission reports</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-blue-600 mb-3">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Customer Support</h3>
                        <p className="text-gray-600 text-sm">Advanced tools to provide excellent customer service</p>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default Agents;