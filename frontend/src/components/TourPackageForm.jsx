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
      // Convert image to Base64 string
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
      // Validate form data
      const { title, description, price, image, availableDates } = formData;

      // Basic validation
      if (!title || !description || !price || !image) {
        alert("Please fill in all required fields");
        return;
      }

      // Prepare data for submission
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

      // Send data to backend
      const response = await axios.post(
        "http://localhost:3000/admin/packages",
        submissionData
      );

      console.log("Package created:", response.data);

      // Reset form after successful submission
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Tour Package
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Package Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          )}
        </div>

        {/* Available Dates */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Available Dates
          </label>
          {formData.availableDates.map((date, index) => (
            <div key={index} className="flex mb-2 items-center">
              <div className="mr-2 flex-grow">
                <label className="block text-xs text-gray-600">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={date.startDate}
                  onChange={(e) => handleDateChange(index, e)}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700"
                  required
                />
              </div>
              <div className="mr-2 flex-grow">
                <label className="block text-xs text-gray-600">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={date.endDate}
                  onChange={(e) => handleDateChange(index, e)}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700"
                  required
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeDateRange(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded mt-4"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Tour Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default TourPackageForm;
