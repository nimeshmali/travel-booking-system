import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const PackagesList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl text-gray-600 mx-auto">
          Explore handpicked travel experiences that promise unforgettable
          memories and breathtaking journeys
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.length > 0 ? (
          packages.map((pkg) => <Card key={pkg._id} packageData={pkg} />)
        ) : (
          <div className="col-span-full text-center">
            <p className="text-gray-500 text-lg">Loading packages...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesList;
