import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2Icon } from "lucide-react";

const DeletePackage = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/packages");
        setPackages(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to fetch packages");
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Handle package deletion
  const handleDeletePackage = async () => {
    if (!selectedPackage) {
      setError("Please select a package to delete");
      return;
    }

    try {
      setIsLoading(true);
      // Find the full package details based on selected title
      const packageToDelete = packages.find(
        (pkg) => pkg.title === selectedPackage
      );

      if (!packageToDelete) {
        setError("Package not found");
        setIsLoading(false);
        return;
      }

      // Make delete request using package ID
      await axios.delete(
        `http://localhost:3000/admin/packages/${packageToDelete._id}`
      );

      // Update packages list
      setPackages(packages.filter((pkg) => pkg._id !== packageToDelete._id));

      // Reset selection
      setSelectedPackage("");
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error("Error deleting package:", err);
      setError("Failed to delete package");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Manage Travel Packages
        </h1>
        <p className="text-xl opacity-90">
          Carefully select and remove travel packages from your catalog
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label
            htmlFor="package-select"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Package to Delete
          </label>
          <select
            id="package-select"
            value={selectedPackage}
            onChange={(e) => {
              setSelectedPackage(e.target.value);
              setError(null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">Select a package</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg.title}>
                {pkg.title} - ${pkg.price}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleDeletePackage}
          disabled={!selectedPackage || isLoading}
          className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2Icon className="mr-2" />
          {isLoading ? "Deleting..." : "Delete Package"}
        </button>

        {error && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>

      {/* Package Preview Section */}
      {selectedPackage && (
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Package Preview
          </h2>
          {(() => {
            const selectedPkgDetails = packages.find(
              (pkg) => pkg.title === selectedPackage
            );
            return selectedPkgDetails ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Title:</strong> {selectedPkgDetails.title}
                  </p>
                  <p>
                    <strong>Price:</strong> ${selectedPkgDetails.price}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedPkgDetails.description}
                  </p>
                </div>
                <div>
                  {selectedPkgDetails.image && (
                    <img
                      src={selectedPkgDetails.image}
                      alt={selectedPkgDetails.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default DeletePackage;
