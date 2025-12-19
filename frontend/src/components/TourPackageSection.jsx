import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import packageService from '../api/services/packageService';
import TourPackageCard from './TourPackageCard';
import { Button } from "@/components/ui/button";

const TourPackagesSection = () => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
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

    const totalPackages = packages.length;

    // Get 3 visible packages based on current index (circular)
    const getVisiblePackages = () => {
        if (totalPackages === 0) return [];
        if (totalPackages === 1) return [packages[0], packages[0], packages[0]];
        if (totalPackages === 2) {
            const prev = packages[currentIndex];
            const center = packages[(currentIndex + 1) % totalPackages];
            const next = packages[currentIndex];
            return [prev, center, next];
        }

        // Get 3 consecutive packages in circular manner
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const idx = (currentIndex + i) % totalPackages;
            visible.push(packages[idx]);
        }
        return visible;
    };

    const visiblePackages = getVisiblePackages();

    const handleNextSlide = useCallback(() => {
        if (totalPackages === 0) return;
        setCurrentIndex((prev) => (prev + 1) % totalPackages);
    }, [totalPackages]);

    const handlePrevSlide = useCallback(() => {
        if (totalPackages === 0) return;
        setCurrentIndex((prev) => (prev - 1 + totalPackages) % totalPackages);
    }, [totalPackages]);

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

    return (
        <section className="pb-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header (left-aligned like other Home sections) */}
                <div className="relative mx-auto w-11/12 lg:w-2/3 max-w-6xl mb-12">
                    <div className="max-w-4xl">
                        <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600">Featured</p>
                        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.08]">
                            Discover Amazing Tour Packages
                        </h2>
                    </div>
                </div>

                {/* Package Carousel */}
                <div className="max-w-6xl mx-auto mb-4 relative">
                    {packages.length > 0 ? (
                        <>
                            <div className="overflow-visible py-8">
                                <div className="flex items-center justify-center gap-4 px-16 transition-transform duration-700 ease-in-out">
                                    {visiblePackages.map((packageData, idx) => {
                                        const isCenter = idx === 1; // Center card is always at index 1

                                        return (
                                            <div
                                                key={`${packageData._id}-${currentIndex}-${idx}`}
                                                className={`flex-shrink-0 transition-all duration-700 ease-in-out ${totalPackages === 1
                                                    ? 'w-full max-w-md'
                                                    : 'w-full sm:w-1/2 lg:w-1/3'
                                                    }`}
                                                style={{
                                                    transform: isCenter && totalPackages > 1 ? 'scale(1.05)' : 'scale(0.9)',
                                                    opacity: isCenter || totalPackages === 1 ? 1 : 0.6,
                                                }}
                                            >
                                                <TourPackageCard
                                                    packageData={packageData}
                                                    isCenter={isCenter}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Custom arrows */}
                            {totalPackages > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handlePrevSlide}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10 hover:bg-white/90 transition-colors z-10"
                                        aria-label="Previous package"
                                    >
                                        <span className="text-xl leading-none">‹</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextSlide}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10 hover:bg-white/90 transition-colors z-10"
                                        aria-label="Next package"
                                    >
                                        <span className="text-xl leading-none">›</span>
                                    </button>
                                </>
                            )}

                            {/* Indicator dots */}
                            {totalPackages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {packages.map((_, index) => {
                                        const centerIndex = (currentIndex + 1) % totalPackages;
                                        const isActive = index === centerIndex;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex((index - 1 + totalPackages) % totalPackages)}
                                                className={`h-2 rounded-full transition-all duration-300 ${isActive
                                                    ? 'bg-primary-600 w-8'
                                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                                                    }`}
                                                aria-label={`Go to package ${index + 1}`}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
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

                {/* Explore More Button */}
                {packages.length > 0 && (
                    <div className="text-center">
                        <button
                            onClick={handleExploreMore}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium text-base rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
                        >
                            <span>
                                {packages.length > 3 ? `Explore More Packages` : 'View All Tours'}
                            </span>
                            <FaArrowRight className="w-4 h-4" />
                        </button>
                        {packages.length > 3 && (
                            <p className="text-gray-600 mt-3">View all <span className="text-primary-600 font-semibold">{packages.length}</span> available packages</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TourPackagesSection;