import { CalendarIcon, IndianRupeeIcon, UserIcon, MailIcon, PhoneIcon, MapPinIcon, TagIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import packageService from "../api/services/packageService";

const PackageDetails = () => {
    const { id: packageId } = useParams();
    const navigate = useNavigate();

    const [packageDetails, setPackageDetails] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        selectedDate: ''
    });
    const [dateError, setDateError] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    // Get available dates from package data
    const upcomingDates = packageDetails?.availableDates?.map(date => date.startDate) || [];



    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await packageService.getPackageDetails(packageId);
                setPackageDetails(response);
            } catch (err) {
                throw err;
            }
        };

        fetchPackageDetails();
    }, [packageId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingForm(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'selectedDate' && value) {
            setDateError(false);
        }
    };

    const handleBookPackage = async () => {
        // Validate form
        if (!bookingForm.selectedDate) {
            setDateError(true);
            return;
        }

        if (!bookingForm.name.trim() || !bookingForm.email.trim() || !bookingForm.phone.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        setDateError(false);
        setIsBooking(true);

        try {
            // Prepare booking data to match backend expectations
            const bookingData = {
                name: bookingForm.name.trim(),
                email: bookingForm.email.trim(),
                phoneNumber: bookingForm.phone.trim(), // Backend expects 'phoneNumber'
                bookingDate: bookingForm.selectedDate, // Backend expects 'bookingDate'
            };

            // Create Stripe checkout session and redirect to payment page
            const session = await packageService.createCheckoutSession(packageId, bookingData);
            if (session?.url) {
                window.location.href = session.url;
                return;
            }

            throw new Error("Unable to start payment session");
        } catch (error) {
            console.error("Booking failed:", error);
            const errorMessage = error.response?.data?.message || error.message || 'Booking failed. Please try again.';
            alert(errorMessage);
            setIsBooking(false);
        }
    };

    const formatLocation = (location) => {
        if (!location) return "Beautiful Destination";
        const parts = [];
        if (location.city) parts.push(location.city);
        if (location.region) parts.push(location.region);
        if (location.country) parts.push(location.country);
        return parts.join(", ");
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-80 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
                <img
                    src="/beach2.jpg" // replace with your hero background image
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover brightness-75"
                />

                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Tour Details</h1>
                        <div className="flex items-center justify-center space-x-2 text-lg">
                            <span>Home</span>
                            <span>»</span>
                            <span>Tour Details</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Package Details */}
                    <div className="space-y-6">
                        {/* Package Image */}
                        <div className="rounded-t-2xl overflow-hidden shadow-2xl">
                            <img
                                src={packageDetails?.images?.[0] || "/beach2.jpg"}
                                alt={packageDetails?.title || "Package"}
                                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Package Information */}
                        <div className="bg-white rounded-b-2xl shadow-xl p-8 border border-gray-100">
                            <h2 className="text-3xl font-bold text-gray-800 mb-1 ml-1">
                                {packageDetails?.title || "Amazing Tour Package"}
                            </h2>

                            <div className="flex items-center text-gray-600 mb-4">
                                <MapPinIcon className="w-4 h-4 mr-1 text-primary-500" />
                                <span className="text-sm font-medium">{formatLocation(packageDetails?.location)}</span>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                {packageDetails?.description || "Embark on an unforgettable journey to one of the world's most breathtaking destinations. This carefully curated package offers the perfect blend of adventure, relaxation, and cultural immersion."}
                            </p>

                            {/* Tags Section */}
                            {packageDetails?.tags && packageDetails.tags.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {packageDetails.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                            >
                                                <TagIcon className="w-3 h-3 mr-1" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center bg-green-50 px-4 py-3 rounded-full">
                                    <IndianRupeeIcon className="w-6 h-6 text-green-600 mr-2" />
                                    <div>
                                        <span className="text-2xl font-bold text-green-600">
                                            {packageDetails?.price?.toLocaleString('en-IN') || "25,999"}
                                        </span>
                                        <span className="text-gray-600 ml-1">per person</span>
                                    </div>
                                </div>

                                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full">
                                    <TagIcon className="w-5 h-5 text-gray-600 mr-2" />
                                    <span className="text-gray-600 font-semibold capitalize">
                                        {packageDetails?.category || "Adventure"}
                                    </span>
                                </div>

                                {packageDetails?.durationDays && (
                                    <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full">
                                        <CalendarIcon className="w-5 h-5 text-gray-600 mr-2" />
                                        <span className="text-gray-600 font-semibold">
                                            {packageDetails.durationDays} Days
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Booking Form */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Book Your Adventure</h3>
                                <p className="text-gray-600">Fill in your details to secure your spot</p>
                            </div>

                            <form className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={bookingForm.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your full name"
                                            required
                                            disabled={isBooking}
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={bookingForm.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your email"
                                            required
                                            disabled={isBooking}
                                        />
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={bookingForm.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your phone number"
                                            required
                                            disabled={isBooking}
                                        />
                                    </div>
                                </div>

                                {/* Date Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Tour Date *
                                    </label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select
                                            name="selectedDate"
                                            value={bookingForm.selectedDate}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${dateError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                            disabled={isBooking}
                                        >
                                            <option value="">Choose a date</option>
                                            {upcomingDates.map((date, index) => (
                                                <option key={index} value={date}>
                                                    {formatDate(date)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {dateError && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                            <span className="mr-1">⚠️</span>
                                            Please select a tour date before proceeding
                                        </p>
                                    )}
                                </div>

                                {/* Book Now Button */}
                                <button
                                    type="button"
                                    onClick={handleBookPackage}
                                    disabled={isBooking}
                                    className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 ${isBooking
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-primary-500 hover:bg-primary-600 active:scale-95'
                                        } text-white`}
                                >
                                    <div className="flex items-center justify-center">
                                        {isBooking ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Booking...
                                            </>
                                        ) : (
                                            'Book Now'
                                        )}
                                    </div>
                                </button>
                            </form>

                            {/* Trust Indicators */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Secure Booking
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Instant Confirmation
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        24/7 Support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;