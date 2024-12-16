import React from "react";
import PropTypes from "prop-types";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({ packageData, onBookNow }) => {
  console.log(packageData);
  const { image, title, description, price, _id } = packageData;
  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate(`/booking/${_id}`);
    // Redirect or open booking form logic can go here
  };
  return (
    <div className="group relative w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 w-full">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>

        {/* Package Details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-semibold text-gray-800">{price}</span>
          </div>

          <button
            onClick={() => handleBookNow()}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full 
            hover:bg-blue-700 transition-colors duration-300 
            transform hover:scale-105 active:scale-95 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  packageData: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onBookNow: PropTypes.func.isRequired,
};

export default Card;
