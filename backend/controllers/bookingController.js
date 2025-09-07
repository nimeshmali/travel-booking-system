const Booking = require("../models/Booking");
const TourPackage = require("../models/TourPackage");

// Book a package
const bookPackage = async (req, res) => {
  try {
    const { name, email, phoneNumber, bookingDate } = req.body;
    const packageId = req.params.id;

    // Verify package exists
    const tourPackage = await TourPackage.findById(packageId);
    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Create booking with package name and amount
    const newBooking = new Booking({
      name,
      email,
      phoneNumber,
      packageId,
      packageName: tourPackage.title, // Store package name
      amountPaid: tourPackage.price, // Store amount paid
      userId: req.user.id, // comes from auth middleware
      bookingDate,
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
    const bookings = await Booking.find()
      .populate("packageId", "title price") // show only essential fields
      .populate("userId", "name email"); // add user details if needed

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// Get logged-in user's bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("packageId", "title price availableDates");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user bookings",
      error: error.message,
    });
  }
};


module.exports = {
  bookPackage,
  getAllBookings,
  getUserBookings,
};
