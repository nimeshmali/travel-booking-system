const bcrypt = require("bcrypt");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { generateToken } = require("../config/jwt");

// Register a new user
const register = async (req, res) => {
	try {
		const { username, email, password, isAdmin } = req.body;

		// Check if email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ success: false, message: "Email already in use" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user with role
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			role: isAdmin ? "user" : "admin", // role-based
		});

		await newUser.save();

		return res.status(201).json({ success: true, message: "User registered successfully" });
	} catch (error) {
		return res.status(500).json({ success: false, message: "Server error", error: error.message });
	}
};

// Login user
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ success: false, message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ success: false, message: "Invalid credentials" });
		}

		// Generate JWT token
		const token = generateToken({
			id: user._id,
			role: user.role, // "user" | "admin"
		});

		return res.json({
			success: true,
			message: "Login successful",
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: "Server error", error: error.message });
	}
};

// Get user profile
const getProfile = async (req, res) => {
	try {
		// Find user
		const user = await User.findById(req.user.id).select("-password");
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });


		}

		// Find all bookings by user
		const bookings = await Booking.find({ userId: req.user.id })
			.populate("packageId", "title price availableDates")
			.sort({ bookingDate: -1 }); // recent bookings first


		return res.json({
			success: true,
			user,
			bookings,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};


module.exports = { register, login, getProfile };
