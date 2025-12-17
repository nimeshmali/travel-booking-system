import React from "react";
import { FaStar } from "react-icons/fa";
import TourPackagesSection from "./TourPackageSection";
import { Card, CardContent } from "@/components/ui/card";


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


            <section
                id="about"
                className="relative overflow-hidden py-20 bg-white"
            >
                {/* Header (stays on plain white) */}
                <div className="relative mx-auto w-11/12 lg:w-2/3 max-w-6xl">
                    <div className="max-w-4xl">
                        <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600">
                            Mission, values + goals
                        </p>
                        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.08]">
                            Tripzy is on a mission to make planning travel effortless. We know first-hand the
                            challenges of booking trips globally and we’re here to make it better.
                        </h2>
                    </div>
                </div>

                {/* Full-width image band (only behind cards) */}
                <div className="relative mt-14 w-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/aboutUs.jpg')" }}
                    />
                    {/* Subtle overlay (no heavy blur) */}
                    {/* <div className="absolute inset-0 bg-white/50" /> */}

                    <div className="relative mx-auto w-11/12 lg:w-2/3 max-w-6xl py-12">
                        <div className="grid max-w-4xl grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
                            {/* 01 - transparent (no background color) */}
                            <Card className="h-full min-h-[240px] rounded-2xl border-none shadow-none sm:col-start-1 sm:row-start-1 bg-transparent">
                                <CardContent className="p-8">
                                    <p className="text-xs font-medium tracking-widest text-primary-600">01</p>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
                                        Our mission
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                                        We’re here to remove the friction from travel planning. From discovery to
                                        booking, we make it easy to build the trip you actually want.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* 02 - white */}
                            <Card className="h-full min-h-[240px] rounded-2xl border-white/60 bg-white/95 shadow-sm sm:col-start-2 sm:row-start-1">
                                <CardContent className="p-8">
                                    <p className="text-xs font-medium tracking-widest text-primary-600">02</p>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
                                        Our values
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                                        We’re committed to clarity, craftsmanship, and care. We keep things simple,
                                        listen closely, and deliver on our promises—consistently improving every day.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* 03 - white */}
                            <Card className="h-full min-h-[240px] rounded-2xl border-white/60 bg-white/95 shadow-sm sm:col-start-1 sm:row-start-2">
                                <CardContent className="p-8">
                                    <p className="text-xs font-medium tracking-widest text-primary-600">03</p>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
                                        Our goals
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                                        We aim to make world-class travel accessible to everyone by building a fun,
                                        streamlined, and trustworthy booking experience.
                                    </p>
                                </CardContent>
                            </Card>
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
