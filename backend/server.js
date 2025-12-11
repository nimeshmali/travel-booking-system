require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
// Initialize app
const app = express();
const PORT = process.env.PORT;
// Middleware
const allowedOrigins = process.env.FRONTEND_URLS
	? process.env.FRONTEND_URLS.split(",")
	: [];

app.use(
	cors({
		origin: allowedOrigins,
	})
);

// Stripe webhook needs raw body for signature verification
app.use("/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "15mb" }));

// Connect to database
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);
app.use("/packages/book", bookingRoutes);
app.use("/payments", paymentRoutes);

// Health check route
app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
