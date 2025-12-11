const Stripe = require("stripe");
const Booking = require("../models/Booking");
const TourPackage = require("../models/TourPackage");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const getFrontendBaseUrl = () => {
	const urls = process.env.FRONTEND_URLS
		? process.env.FRONTEND_URLS.split(",").map((u) => u.trim()).filter(Boolean)
		: [];

	return process.env.FRONTEND_BASE_URL || urls[0] || "http://localhost:5173";
};

// Create Stripe Checkout Session and redirect user to Stripe hosted payment page
const createCheckoutSession = async (req, res) => {
	try {
		const { name, email, phoneNumber, bookingDate } = req.body;
		const packageId = req.params.id;

		if (!name || !email || !phoneNumber || !bookingDate) {
			return res.status(400).json({ message: "Missing required booking details" });
		}

		const tourPackage = await TourPackage.findById(packageId);
		if (!tourPackage) {
			return res.status(404).json({ message: "Package not found" });
		}

		const currency = "inr";
		const unitAmount = Math.round(Number(tourPackage.price || 0) * 100); // Stripe expects amount in the smallest currency unit

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			customer_email: email,
			line_items: [
				{
					price_data: {
						currency,
						product_data: {
							name: tourPackage.title,
							description: tourPackage.description?.slice(0, 200) || "Travel package",
						},
						unit_amount: unitAmount,
					},
					quantity: 1,
				},
			],
			metadata: {
				userId: req.user.id,
				packageId,
				name,
				email,
				phoneNumber,
				bookingDate,
				packageName: tourPackage.title,
				amount: tourPackage.price?.toString(),
				currency,
			},
			success_url: `${getFrontendBaseUrl()}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${getFrontendBaseUrl()}/payment-cancel?packageId=${packageId}`,
		});

		res.status(200).json({
			message: "Checkout session created",
			url: session.url,
			sessionId: session.id,
		});
	} catch (error) {
		console.error("Stripe session error:", error);
		res.status(500).json({
			message: "Failed to initiate payment",
			error: error.message,
		});
	}
};

// Webhook to finalize booking after successful payment
const handleWebhook = async (req, res) => {
	const sig = req.headers["stripe-signature"];

	let event;
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error("Stripe webhook signature verification failed:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object;

		try {
			const { metadata, payment_intent: paymentIntentId, id: sessionId } = session;

			// Avoid duplicate bookings for the same session
			const existingBooking = await Booking.findOne({ checkoutSessionId: sessionId });
			if (existingBooking) {
				return res.status(200).json({ received: true });
			}

			const bookingDate = metadata.bookingDate ? new Date(metadata.bookingDate) : new Date();

			const bookingPayload = {
				name: metadata.name,
				email: metadata.email,
				phoneNumber: metadata.phoneNumber,
				packageId: metadata.packageId,
				packageName: metadata.packageName,
				amountPaid: Number(metadata.amount) || 0,
				userId: metadata.userId,
				bookingDate,
				paymentStatus: "paid",
				paymentIntentId,
				checkoutSessionId: sessionId,
				currency: metadata.currency || "inr",
			};

			const booking = new Booking(bookingPayload);
			await booking.save();
		} catch (err) {
			console.error("Error creating booking from webhook:", err);
			return res.status(500).json({ message: "Webhook processing failed" });
		}
	}

	res.status(200).json({ received: true });
};

// Retrieve checkout session and related booking info for confirmation page
const getSessionStatus = async (req, res) => {
	try {
		const { sessionId } = req.params;

		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ["payment_intent"],
		});

		// Ensure the session belongs to the current user
		if (session?.metadata?.userId !== req.user.id) {
			return res.status(403).json({ message: "You are not authorized to view this payment" });
		}

		const booking = await Booking.findOne({ checkoutSessionId: sessionId });

		return res.status(200).json({
			paymentStatus: session.payment_status,
			booking,
		});
	} catch (error) {
		console.error("Error fetching session status:", error);
		return res.status(500).json({
			message: "Unable to fetch payment status",
			error: error.message,
		});
	}
};

module.exports = {
	createCheckoutSession,
	handleWebhook,
	getSessionStatus,
};

