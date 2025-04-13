const express = require("express");
const router = express.Router();
const { bookPackage, getAllBookings, getUserBookings } = require("../controllers/bookingController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

// User routes
router.post("/:id", authenticate, bookPackage);
router.get("/my-bookings", authenticate, getUserBookings);

// Admin routes
router.get("/", authenticate, authorizeAdmin, getAllBookings);

module.exports = router;
