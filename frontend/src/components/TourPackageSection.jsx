import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import packageService from '../api/services/packageService'; // Adjust path as needed
import Card from './Card'; // Import your existing Card component

const TourPackagesSection = () => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch all packages on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setIsLoading(true);
                const packageList = await packageService.getAllPackages();
                setPackages(packageList);
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError('Failed to load tour packages. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handleExploreMore = () => {
        navigate('/tours');
    };

    if (isLoading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <FaSpinner className="w-6 h-6 animate-spin text-blue-600" />
                            <span className="text-lg text-gray-600">Loading amazing tour packages...</span>
                        </div>
                        {/* Loading skeleton cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="bg-gray-100 animate-pulse rounded-xl h-96"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <h3 className="text-red-800 font-semibold mb-2">Unable to Load Packages</h3>
                            <p className="text-red-600 text-sm">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Get first 3 packages for display
    const featuredPackages = packages.slice(0, 3);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Discover Amazing
                        <span className="text-primary-600 ml-2">Tour Packages</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our handpicked collection of extraordinary travel experiences.
                        From breathtaking destinations to unforgettable adventures, find your perfect getaway.
                    </p>
                </div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
                    {featuredPackages.length > 0 ? (
                        featuredPackages.map((packageData) => (
                            <Card
                                key={packageData._id}
                                packageData={packageData}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Packages Available</h3>
                            <p className="text-gray-500">Check back soon for exciting tour packages!</p>
                        </div>
                    )}
                </div>

                {/* Explore More Button - Show if there are any packages */}
                {packages.length > 0 && (
                    <div className="text-center">
                        <button
                            onClick={handleExploreMore}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white font-medium text-base rounded-full 
                hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        >
                            <span>
                                {packages.length > 3 ? `Explore More Packages` : 'View All Tours'}
                            </span>
                            <FaArrowRight className="w-4 h-4" />
                        </button>
                        {packages.length > 3 && (
                            <p className="text-gray-600 mt-3">
                                View all {packages.length} available packages
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TourPackagesSection;