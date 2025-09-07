import React from "react";
import { FaAward, FaGlobe, FaHeart, FaShieldAlt, FaStar, FaUsers } from 'react-icons/fa';
import TourPackagesSection from "./TourPackageSection";


const Home = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-screen w-full">
                <img
                    src="/LandingPhoto.jpg" // replace with your image
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Blur/Dark overlay */}
                <div className="relative flex h-full justify-center items-center">
                    <div className="w-2/3 flex flex-col items-start text-left text-white px-6">
                        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg w-2/3">
                            Discover The World With Us
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl">
                            We are Tripzy, a modern travel agency dedicated to making your journeys seamless and unforgettable. From exotic getaways to weekend escapes, we bring you the best experiences at unbeatable value.
                        </p>
                    </div>
                </div>


            </section>

            {/* About Us Section */}


            <section id="about" className="py-16 bg-gray-50">
                <div className="w-2/3 mx-auto bg-white rounded-lg shadow-lg p-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-12">
                        <div className="flex-1">
                            <p className="text-primary-600">hurrey!!!</p>
                            <h2 className="text-4xl font-bold text-gray-800 text-left">
                                About Us
                            </h2>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <p className="text-sm font-light text-gray-600 leading-relaxed text-left mt-3">
                                Premier travel agency creating unforgettable journeys worldwide. We turn your travel dreams into reality with expertise and passion
                            </p>
                        </div>
                    </div>

                    {/* Three Feature Sections in a Row */}
                    <div className="grid grid-cols-3 gap-8 pt-12">
                        {/* Global Expertise */}
                        <div className="text-left">
                            <FaGlobe className="text-black text-lg mb-3 font-thin" />
                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                                Global Expertise
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                With extensive knowledge of destinations worldwide, we provide insider
                                insights and curated experiences that showcase the best each location offers.
                            </p>
                        </div>

                        {/* Personalized Service */}
                        <div className="text-left">
                            <FaHeart className="text-black text-lg mb-3 font-thin" />
                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                                Personalized Service
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We craft personalized itineraries tailored to your preferences and travel
                                style, creating trips that reflect your desires and lasting memories.
                            </p>
                        </div>

                        {/* Trusted & Secure */}
                        <div className="text-left">
                            <FaShieldAlt className="text-black text-lg mb-3 font-thin" />
                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                                Trusted & Secure
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Your peace of mind is our priority. We partner with trusted suppliers and
                                provide 24/7 support with comprehensive travel protection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="w-2/3 mx-auto">
                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <p className="text-sm text-primary-600 font-medium mb-2">WHY US</p>
                        <h2 className="text-4xl font-bold text-gray-800">
                            Why travel with us
                        </h2>
                    </div>

                    {/* Top Two Cards */}
                    <div className="flex justify-center gap-8 mb-8">
                        {/* Happy Customers Card */}
                        <div className="w-1/3 bg-gray-50 rounded-lg p-6 text-left justify-center items-center bg-primary-50">
                            <div className="text-3xl font-bold text-primary-800 mb-1 pt-3">
                                15k+
                            </div>
                            <p className="text-sm text-gray-600">
                                Happy customers worldwide
                            </p>
                        </div>

                        {/* Rating Card */}
                        <div className="w-1/3 bg-gray-50 rounded-lg p-6 flex flex-col justify-center items-center bg-primary-50">
                            <div className="flex items-center text-3xl font-bold text-gray-800 mb-1">
                                4.9   <FaStar className="text-yellow-500 text-lg ml-2 w-6 h-6" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Average customer rating
                            </p>
                        </div>
                    </div>

                    {/* Bottom Card */}
                    <div className="flex justify-center my-3 ">
                        <div className="w-2/3 bg-gray-50 rounded-lg p-6 text-center bg-primary-50">
                            <div className="text-3xl font-bold text-gray-800 mb-1">
                                $2.5M+
                            </div>
                            <p className="text-sm text-gray-600">
                                Total bookings processed
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <TourPackagesSection />


        </div>
    );
};

export default Home;
