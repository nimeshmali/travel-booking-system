import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ImageIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  IndianRupeeIcon,
  UsersIcon,
} from "lucide-react";
import jsPDF from "jspdf";

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

  const generateInvoice = ({ packageDetails, formData }) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Booking Invoice", 105, 20, null, null, "center");

    // Package Details
    doc.setFontSize(12);
    doc.text(`Package: ${packageDetails.title}`, 20, 40);

    // Booking Details
    doc.text(`Name: ${formData.name}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Phone Number: ${formData.phoneNumber}`, 20, 80);
    doc.text(`Number of Travelers: ${formData.numberOfTravelers}`, 20, 90);
    doc.text(
      `Special Requests: ${formData.specialRequests || "None"}`,
      20,
      100
    );

    // Pricing
    const totalAmount = packageDetails.price * formData.numberOfTravelers;
    doc.text(
      `Price per Traveler: ₹${packageDetails.price.toLocaleString()}`,
      20,
      120
    );
    doc.text(`Total Amount: ₹${totalAmount.toLocaleString()}`, 20, 130);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Thank you for booking with us! Please retain this invoice for your records.",
      20,
      150
    );

    // Convert PDF to Blob and open in a new tab
    const pdfBlob = doc.output("blob");
    const pdfURL = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfURL);

    // Optional: Trigger download
    const a = document.createElement("a");
    a.href = pdfURL;
    a.download = "booking-invoice.pdf";
    a.click();
  };

  // Fetch package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `https://travel-booking-system-nine.vercel.app/packages/${packageId}`
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
        `https://travel-booking-system-nine.vercel.app/packages/book/${packageId}`,
        formData
      );
      generateInvoice({
        packageDetails,
        formData,
      });

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

  return (
    <div className="container mx-auto px-8 py-8 lg:flex lg:space-x-8 bg-gray-100 min-h-screen">
      {/* Package Details Section */}
      <div className="lg:w-1/2">
        <div className="bg-white shadow-2xl rounded-xl h-full transform transition-all ">
          <div className="relative mx-4 pt-4 h-96 overflow-hidden ">
            <img
              src={packageDetails.image}
              alt={packageDetails.title}
              className="w-full h-full object-cover object-center rounded-xl transition-transform duration-300"
              onError={handleImageError}
            />
          </div>

          <div className="p-6 mt-3">
            <h1 className="text-3xl font-bold text-gray-600 mb-4">
              {packageDetails.title}
            </h1>

            <p className="text-gray-400 font-semibold text-lg leading-relaxed mb-6">
              {packageDetails.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-700 mt-10">
              {startDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-7 h-7 text-blue-500" />
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
                  <CalendarIcon className="w-7 h-7 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">
                      End Date
                    </h3>
                    <p>{formatDate(endDate)}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <IndianRupeeIcon className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-green-600 font-semibold text-2xl">
                    {packageDetails.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {startDate && endDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-7 h-7 text-purple-500" />
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
      <div className="lg:w-1/2 mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 transform transition-all hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-xl shadow-lg">
            Book Your Package
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-600"
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
                className="block w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-md font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="numberOfTravelers"
                className="block text-md font-medium text-gray-600"
              >
                Number of Travelers
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  id="numberOfTravelers"
                  name="numberOfTravelers"
                  min="1"
                  max={packageDetails.maxTravelers || 10}
                  required
                  value={formData.numberOfTravelers}
                  onChange={handleChange}
                  className="ml-2 flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block text-md font-medium text-gray-600"
              >
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows="4"
                value={formData.specialRequests}
                onChange={handleChange}
                className="block h-12 w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none"
                placeholder="Any special requests or notes"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
