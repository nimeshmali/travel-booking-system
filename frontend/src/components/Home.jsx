import React, { useCallback } from "react";
import { IndianRupee, Star, StarHalf } from "lucide-react";
import TourPackagesSection from "./TourPackageSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const Home = () => {
    const handleExploreMore = useCallback(() => {
        const el = document.getElementById("tour-packages");
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

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
                        <p className="mt-5 text-base md:text-lg max-w-xl text-white/90 leading-relaxed">
                            Plan your next trip in minutes—discover packages, book fast, and travel stress-free.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button
                                onClick={handleExploreMore}
                                className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base md:text-lg"
                            >
                                Explore more
                            </Button>

                            <Button
                                asChild
                                className="bg-black text-white hover:bg-black/90 rounded-full px-8 h-12 text-base md:text-lg border border-white/15"
                            >
                                <Link to="/signup">Join now</Link>
                            </Button>
                        </div>
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

            {/* Tour packages (show first) */}
            <section id="tour-packages" className="scroll-mt-24">
                <TourPackagesSection />
            </section>

            {/* Why travel with us (improved) */}
            <section className="relative overflow-hidden py-20 sm:py-24">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-90"
                    style={{ backgroundImage: "url('/whyUs.jpg')" }}
                />
                {/* Readability overlays */}
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />

                <div className="relative mx-auto w-11/12 lg:w-2/3 max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
                        {/* Left content */}
                        <div className="text-left text-white">
                            <p className="text-xs font-medium tracking-[0.25em] uppercase text-white/80">
                                Our impact
                            </p>
                            <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
                                Why travel with us
                            </h2>
                            <p className="mt-5 max-w-xl text-sm md:text-base text-white/85 leading-relaxed">
                                Transparent pricing, curated itineraries, and 24/7 support—so you can focus on the
                                journey, not the planning.
                            </p>
                        </div>

                        {/* Right stacked stat cards */}
                        <div className="grid gap-5">
                            <Card className="rounded-2xl border-white/20 bg-white/10 text-white shadow-none backdrop-blur-md">
                                <CardContent className="p-6">
                                    <div className="flex items-baseline gap-3">
                                        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                                            15k+
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-white/80">
                                            Travelers
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-white/15 pt-5 text-sm text-white/85">
                                        Happy customers worldwide
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border-white/20 bg-white/10 text-white shadow-none backdrop-blur-md">
                                <CardContent className="p-6">
                                    <div className="flex items-baseline gap-3">
                                        <div className="flex items-center gap-2 text-4xl md:text-5xl font-semibold tracking-tight">
                                            4.9
                                            <Star
                                                className="h-9 w-9 text-white fill-white"
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-white/80">
                                            Rating
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-white/15 pt-5 text-sm text-white/85">
                                        Average customer rating
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border-white/20 bg-white/10 text-white shadow-none backdrop-blur-md">
                                <CardContent className="p-6">
                                    <div className="flex items-baseline gap-3">
                                        <div className="flex items-center gap-1 text-4xl md:text-5xl font-semibold tracking-tight">
                                            <IndianRupee className="h-10 w-10 text-white/95" strokeWidth={4} />
                                            2.5M+
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-white/80">
                                            Bookings
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-white/15 pt-5 text-sm text-white/85">
                                        Total bookings processed
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community love (reviews) */}
            <section className="py-20 bg-slate-50">
                <div className="mx-auto w-11/12 lg:w-2/3 max-w-6xl">
                    <div className="text-left mb-12">
                        <p className="text-sm font-medium text-primary-600 mb-2">
                            Community love
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900">
                            What travelers are saying
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
                            Real stories from our community—trusted reviews from people who booked and traveled with Tripzy.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                review:
                                    "Booking was super smooth and the itinerary was perfectly paced. We had an amazing trip with zero stress.",
                                name: "Manish Singh",
                                rating: 5,
                            },
                            {
                                review:
                                    "Great packages and quick support. The hotel options were exactly what we wanted and check-in was effortless.",
                                name: "Chetan Vaidada",
                                rating: 4,
                            },
                            {
                                review:
                                    "Loved the transparency in pricing and the recommendations. We discovered places we’d have missed otherwise.",
                                name: "Soham Sanghavi",
                                rating: 4.5,
                            },
                        ].map((item) => (
                            <Card key={item.name} className="h-full rounded-2xl bg-white border border-gray-200/60 shadow-sm">
                                <CardContent className="p-8 h-full flex flex-col">
                                    <p className="text-gray-700 leading-relaxed flex-1">
                                        {item.review}
                                    </p>

                                    <div className="pt-6">
                                        <p className="text-gray-900 font-medium">
                                            {item.name}
                                        </p>
                                        <div
                                            className="mt-2 flex items-center gap-1.5 text-sm text-gray-600"
                                            aria-label={`Rating ${item.rating}`}
                                        >
                                            {Number.isInteger(item.rating) ? (
                                                Array.from({ length: item.rating }).map((_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        className="h-4 w-4 text-yellow-500 fill-yellow-500"
                                                        strokeWidth={1.5}
                                                    />
                                                ))
                                            ) : (
                                                <>
                                                    {Array.from({ length: Math.floor(item.rating) }).map((_, idx) => (
                                                        <Star
                                                            key={`full-${idx}`}
                                                            className="h-4 w-4 text-yellow-500 fill-yellow-500"
                                                            strokeWidth={1.5}
                                                        />
                                                    ))}
                                                    <StarHalf
                                                        className="h-4 w-4 text-yellow-500 fill-yellow-500"
                                                        strokeWidth={1.5}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
