import React, { useState, useEffect } from 'react';
import {
    UserIcon,
    MailIcon,
    CalendarIcon,
    MapPinIcon,
    IndianRupeeIcon,
    ClockIcon,
    TagIcon,
    LogOutIcon,
    EditIcon,
    BookmarkIcon
} from 'lucide-react';
import authService from '../api/services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await authService.getProfile();
            setProfileData(response);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatDateTime = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getBookingStatus = (bookingDate) => {
        const today = new Date();
        const booking = new Date(bookingDate);

        if (booking > today) {
            return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
        } else if (booking.toDateString() === today.toDateString()) {
            return { status: 'Today', color: 'bg-green-100 text-green-800' };
        } else {
            return { status: 'Completed', color: 'bg-gray-100 text-gray-800' };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchProfile}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-400 to-primary-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="flex items-center justify-between pt-10">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <UserIcon className="w-12 h-12" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">
                                    Welcome back, {profileData?.user?.username || 'Traveler'}!
                                </h1>
                                <div className="flex items-center space-x-4 text-blue-100">
                                    <div className="flex items-center">
                                        <MailIcon className="w-4 h-4 mr-1" />
                                        <span>{profileData?.user?.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-1" />
                                        <span>Joined {formatDate(profileData?.user?.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {profileData?.user?.role === 'admin' ? (
                            <button
                                onClick={() => navigate('/add-packages')}
                                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                            >
                                <EditIcon className="w-4 h-4" />
                                <span>Add Packages</span>
                            </button>
                        ) : (
                            <></>
                        )}

                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {profileData?.bookings?.length || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookmarkIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Upcoming Tours</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {profileData?.bookings?.filter(booking =>
                                        new Date(booking.bookingDate) > new Date()
                                    ).length || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CalendarIcon className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    ₹{profileData?.bookings?.reduce((total, booking) =>
                                        total + (booking.amountPaid || 0), 0
                                    ).toLocaleString('en-IN') || '0'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <IndianRupeeIcon className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                        <p className="text-gray-600 mt-1">Your travel history and upcoming adventures</p>
                    </div>

                    <div className="p-6">
                        {profileData?.bookings && profileData.bookings.length > 0 ? (
                            <div className="space-y-4">
                                {profileData.bookings.map((booking) => {
                                    const statusInfo = getBookingStatus(booking.bookingDate);

                                    return (
                                        <div key={booking._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {booking.packageName || 'Package Not Available'}
                                                    </h3>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span>{booking.name}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MailIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span>{booking.email}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span>Tour Date: {formatDate(booking.bookingDate)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span>Booked: {formatDateTime(booking.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end space-y-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                                        {statusInfo.status}
                                                    </span>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-green-600">
                                                            ₹{booking.amountPaid?.toLocaleString('en-IN') || 'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-500">amount paid</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Booking ID:</span>
                                                    <span className="ml-2 text-blue-600 font-mono">{booking._id}</span>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
                                <p className="text-gray-600 mb-6">Start exploring amazing destinations and make your first booking!</p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Browse Packages
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;