import { IndianRupeeIcon, MapPinIcon, ClockIcon } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ packageData, onBookNow }) => {
	const {
		images,
		title,
		description,
		price,
		_id,
		location,
		durationDays,
		availableDates
	} = packageData;

	const navigate = useNavigate();

	const handleBookNow = () => {
		navigate(`/package/${_id}`);
	};

	// Format location display
	const formatLocation = () => {
		if (!location) return "Location not specified";
		const { city, region, country } = location;
		return [city, region, country].filter(Boolean).join(", ");
	};

	// Calculate nights from duration days
	const nights = durationDays > 0 ? durationDays - 1 : 0;
	const durationText = `${durationDays} Day${durationDays > 1 ? "s" : ""}`;

	// Format price
	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-IN').format(price);
	};

	return (
		<div className='group relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-2xl'>
			{/* Image */}
			<div className='relative h-56 w-full'>
				<img
					src={images[0]}
					alt={title}
					className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>

				{/* Discount Badge - Optional */}
				<div className='absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
					50% Off
				</div>
			</div>

			{/* Content */}
			<div className='p-5 space-y-4'>
				{/* Title */}
				<div>
					<h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>{title}</h3>
				</div>

				{/* Location and Duration */}
				<div className='flex items-center justify-between text-sm text-gray-600'>
					<div className='flex items-center space-x-1'>
						<MapPinIcon className='w-4 h-4' />
						<span className='line-clamp-1'>{formatLocation()}</span>
					</div>
					<div className='flex items-center space-x-1'>
						<ClockIcon className='w-4 h-4' />
						<span>{durationText}</span>
					</div>
				</div>

				{/* Price */}
				<div className='flex items-center space-x-1'>
					<IndianRupeeIcon className='w-6 h-6 text-gray-800' />
					<span className='text-2xl font-bold text-gray-800'>
						{formatPrice(price)}
					</span>
					{/* Optional: Strike-through original price */}
					<span className='text-sm text-gray-500 line-through ml-2'>
						₹{formatPrice(Math.round(price * 2))}
					</span>
				</div>

				{/* Book Now Button */}
				<button
					onClick={handleBookNow}
					className="w-full py-3 bg-primary-500 text-white font-semibold rounded-full 
             hover:bg-primary-600 focus:outline-none focus:ring-2 
             focus:ring-primary-600 focus:ring-offset-2 shadow-md transition-colors"
				>
					Book Now
				</button>

			</div>
		</div>
	);
};

Card.propTypes = {
	packageData: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		images: PropTypes.arrayOf(PropTypes.string).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		location: PropTypes.shape({
			city: PropTypes.string,
			region: PropTypes.string,
			country: PropTypes.string,
		}),
		durationDays: PropTypes.number.isRequired,
		availableDates: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
	onBookNow: PropTypes.func,
};

Card.defaultProps = {
	onBookNow: () => { },
};

export default Card; 