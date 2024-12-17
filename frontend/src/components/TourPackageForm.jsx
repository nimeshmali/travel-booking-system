import React, { useState } from "react";
import axios from "axios";

const TourPackageForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    availableDates: [
      {
        startDate: "",
        endDate: "",
      },
    ],
  });

  // Handle input changes for text and number fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file conversion to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle date range changes
  const handleDateChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDates = [...formData.availableDates];
    updatedDates[index][name] = value;

    setFormData((prevState) => ({
      ...prevState,
      availableDates: updatedDates,
    }));
  };

  // Add more date ranges
  const addDateRange = () => {
    setFormData((prevState) => ({
      ...prevState,
      availableDates: [
        ...prevState.availableDates,
        { startDate: "", endDate: "" },
      ],
    }));
  };

  // Remove a date range
  const removeDateRange = (index) => {
    const updatedDates = formData.availableDates.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      availableDates: updatedDates,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, description, price, image, availableDates } = formData;

      if (!title || !description || !price || !image) {
        alert("Please fill in all required fields");
        return;
      }

      const submissionData = {
        title,
        description,
        price: parseFloat(price),
        image,
        availableDates: availableDates.map((date) => ({
          startDate: new Date(date.startDate),
          endDate: new Date(date.endDate),
        })),
      };

      const response = await axios.post(
        "https://travel-booking-system-nine.vercel.app/admin/packages",
        submissionData
      );

      console.log("Package created:", response.data);

      setFormData({
        title: "",
        description: "",
        price: "",
        image: "",
        availableDates: [{ startDate: "", endDate: "" }],
      });

      alert("Tour package created successfully!");
    } catch (error) {
      console.error(
        "Error creating package:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create tour package");
    }
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Create Tour Package
        </h1>
        <p className="text-xl opacity-90">
          Add exciting travel packages to your catalog with ease
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter package title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter package description"
              required
            />
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter package price"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Package Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Available Dates */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Available Dates
            </label>
            {formData.availableDates.map((date, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 items-end mb-4"
              >
                <div>
                  <label className="block text-xs text-gray-600">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={date.startDate}
                    onChange={(e) => handleDateChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={date.endDate}
                    onChange={(e) => handleDateChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeDateRange(index)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addDateRange}
            className="text-blue-500 font-semibold hover:underline"
          >
            + Add Another Date Range
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourPackageForm;
