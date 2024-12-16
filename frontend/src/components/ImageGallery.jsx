import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]); // State to store images
  const [error, setError] = useState(null); // State to handle errors

  // Fetch images from the backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/packages");
        setImages(response.data.images); // Update state with fetched images
        console.log(images);
      } catch (err) {
        console.error("Error fetching images:", err.message);
        setError("Failed to load images");
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Tour Package Images
      </h2>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-md flex justify-center "
              >
                <img
                  src={image}
                  alt={`Tour Package ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No images available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
