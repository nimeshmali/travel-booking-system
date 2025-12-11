const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BookingSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: uuidv4, // Automatically generate UUID as string
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		bookingDate: {
			type: Date,
			required: true,
			default: Date.now,
		},
		packageId: {
			type: String, // also better as String if you're using UUID for packages
			required: true,
		},
		packageName: {
			type: String,
			required: true,
			trim: true,
		},
		amountPaid: {
			type: Number,
			required: true,
			min: 0,
		},
		userId: {
			type: String, // also better as String if user uses UUID
			required: true,
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed"],
			default: "pending",
		},
		paymentIntentId: {
			type: String,
		},
		checkoutSessionId: {
			type: String,
			index: true,
			unique: true,
			sparse: true,
		},
		currency: {
			type: String,
			default: "inr",
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt automatically
	}
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;