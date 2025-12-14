import React, { useState, useEffect } from 'react';
import {
    UserIcon,
    MailIcon,
    CalendarIcon,
    IndianRupeeIcon,
    ClockIcon,
    EditIcon,
    BookmarkIcon
} from 'lucide-react';
import authService from '../api/services/authService';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            return { status: 'Upcoming', variant: 'default' };
        } else if (booking.toDateString() === today.toDateString()) {
            return { status: 'Today', variant: 'secondary' };
        } else {
            return { status: 'Completed', variant: 'outline' };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="w-full max-w-7xl space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-32 w-full" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                        </div>
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button onClick={fetchProfile}>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
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
                        {profileData?.user?.role === 'admin' && (
                            <Button
                                onClick={() => navigate('/add-packages')}
                                variant="outline"
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 border-white text-white"
                            >
                                <EditIcon className="w-4 h-4" />
                                <span>Add Packages</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                                    <p className="text-3xl font-bold text-foreground">
                                        {profileData?.bookings?.length || 0}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <BookmarkIcon className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Upcoming Tours</p>
                                    <p className="text-3xl font-bold text-foreground">
                                        {profileData?.bookings?.filter(booking =>
                                            new Date(booking.bookingDate) > new Date()
                                        ).length || 0}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <CalendarIcon className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                                    <p className="text-3xl font-bold text-foreground">
                                        ₹{profileData?.bookings?.reduce((total, booking) =>
                                            total + (booking.amountPaid || 0), 0
                                        ).toLocaleString('en-IN') || '0'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <IndianRupeeIcon className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bookings Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Bookings</CardTitle>
                        <CardDescription>Your travel history and upcoming adventures</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {profileData?.bookings && profileData.bookings.length > 0 ? (
                            <div className="space-y-4">
                                {profileData.bookings.map((booking) => {
                                    const statusInfo = getBookingStatus(booking.bookingDate);

                                    return (
                                        <Card key={booking._id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                                            {booking.packageName || 'Package Not Available'}
                                                        </h3>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center">
                                                                <UserIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                                                <span>{booking.name}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <MailIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                                                <span>{booking.email}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                                                <span>Tour Date: {formatDate(booking.bookingDate)}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <ClockIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                                                <span>Booked: {formatDateTime(booking.createdAt)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end space-y-2">
                                                        <Badge variant={statusInfo.variant}>
                                                            {statusInfo.status}
                                                        </Badge>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-primary">
                                                                ₹{booking.amountPaid?.toLocaleString('en-IN') || 'N/A'}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">amount paid</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-border">
                                                    <p className="text-sm text-muted-foreground">
                                                        <span className="font-medium">Booking ID:</span>
                                                        <span className="ml-2 text-primary font-mono">{booking._id}</span>
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <BookmarkIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-foreground mb-2">No bookings yet</h3>
                                <p className="text-muted-foreground mb-6">Start exploring amazing destinations and make your first booking!</p>
                                <Button onClick={() => navigate('/')}>
                                    Browse Packages
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;