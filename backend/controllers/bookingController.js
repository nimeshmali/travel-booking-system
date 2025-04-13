const Booking = require("../models/Booking");
const TourPackage = require("../models/TourPackage");

// Book a package
const bookPackage = async (req, res) => {
	try {
		const { name, email, phoneNumber, numberOfTravelers, specialRequests } = req.body;
		const packageId = req.params.id;

		// Verify package exists
		const package = await TourPackage.findById(packageId);
		if (!package) {
			return res.status(404).json({ message: "Package not found" });
		}

		// Create booking
		const newBooking = new Booking({
			name,
			email,
			phoneNumber,
			numberOfTravelers,
			specialRequests,
			packageId,
		});

		const savedBooking = await newBooking.save();
		res.status(201).json({
			message: "Booking successful",
			booking: savedBooking,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to create booking",
			error: error.message,
		});
	}
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
	try {
		const bookings = await Booking.find().populate("packageId", "title");
		res.status(200).json(bookings);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
	}
};

// Get user bookings
const getUserBookings = async (req, res) => {
	try {
		const bookings = await Booking.find({ email: req.user.email }).populate("packageId");
		res.status(200).json(bookings);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
	}
};

module.exports = {
	bookPackage,
	getAllBookings,
	getUserBookings,
};
