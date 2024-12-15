import React, { useState } from "react";

const InputSubmit = () => {
  // State to manage input value
  const [inputValue, setInputValue] = useState("");
  // State to manage submission response
  const [response, setResponse] = useState("");
  // State to handle any errors during submission
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to backend
      const response = await fetch(
        "https://travel-booking-system-nine.vercel.app/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: inputValue }),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        throw new Error("Submission failed");
      }

      // Parse response
      const result = await response.json();

      // Update response state
      setResponse(result.message || "Submission successful");

      // Clear input after successful submission
      setInputValue("");

      // Clear any previous errors
      setError("");
    } catch (err) {
      // Handle any errors during submission
      setError(err.message || "An error occurred");
      setResponse("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="input-field"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter your data:
          </label>
          <input
            id="input-field"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Type something..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>

      {/* Display response or error messages */}
      {response && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          {response}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
      )}
    </div>
  );
};

export default InputSubmit;
