require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
	cors({
		origin: ["http://localhost:5173", "https://travel-booking-system-frontend.vercel.app"],
		credentials: true,
	})
);
app.use(express.json({ limit: "10mb" }));

// Connect to database
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);
app.use("/packages/book", bookingRoutes);

// Health check route
app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

// Start server if running directly
if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

// Export app for serverless functions
module.exports = app;
