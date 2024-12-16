import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ImageIcon, CalendarIcon, DollarSignIcon } from "lucide-react";

const PackageBookingPage = () => {
  const { id: packageId } = useParams();
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    numberOfTravelers: 1,
    specialRequests: "",
  });

  // Fetch package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/packages/${packageId}`
        );
        setPackageDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load package details");
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/packages/book/${packageId}`,
        formData
      );

      alert(response.data.message || "Booking confirmed successfully!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to book package. Please try again.";
      alert(errorMessage);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="spinner animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !packageDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Oops! Something went wrong
          </h2>
          <p>{error || "Package not found"}</p>
        </div>
      </div>
    );
  }

  // Determine start and end dates
  const startDate =
    packageDetails.availableDates && packageDetails.availableDates.length > 0
      ? packageDetails.availableDates[0].startDate
      : null;

  const endDate =
    packageDetails.availableDates && packageDetails.availableDates.length > 0
      ? packageDetails.availableDates[0].endDate
      : null;

  // Calculate duration
  const calculateDuration = (start, end) => {
    if (!start || !end) return "N/A";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:flex lg:space-x-8 bg-gray-50 min-h-screen">
      {/* Package Details Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all hover:shadow-3xl">
          {/* Image with fallback and error handling */}
          <div className="relative w-full h-96 bg-gray-200">
            {!imageError ? (
              <img
                src={packageDetails.image || "/placeholder-image.jpg"}
                alt={packageDetails.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={handleImageError}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ImageIcon className="w-16 h-16 mb-4" />
                <p>Image not available</p>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {packageDetails.title}
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed">
              {packageDetails.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              {startDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">
                      Start Date
                    </h3>
                    <p>{formatDate(startDate)}</p>
                  </div>
                </div>
              )}

              {endDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">
                      End Date
                    </h3>
                    <p>{formatDate(endDate)}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <DollarSignIcon className="w-5 h-5 text-green-500" />
                <div>
                  <h3 className="font-semibold text-sm text-gray-600">Price</h3>
                  <p className="text-green-600 font-bold text-xl">
                    ${packageDetails.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {startDate && endDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-purple-500" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">
                      Duration
                    </h3>
                    <p>{calculateDuration(startDate, endDate)} days</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="lg:w-1/2">
        <div className="bg-white shadow-2xl rounded-xl p-6 transform transition-all hover:shadow-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Book Your Package
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields remain the same as in previous version */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Rest of the form fields... */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-[1.02] active:scale-100"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageBookingPage;
