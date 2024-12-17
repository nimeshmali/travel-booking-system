const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TourPackage = require("./models/TourPackage");
const Booking = require("./models/Booking");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://travel-booking-system-frontend.vercel.app/",
    ],
  })
);

app.use(express.json({ limit: "10mb" }));
const PORT = 3000;
// MongoDB connection function
const connectDB = require("./connect");
const connect = connectDB();
// Define schema and model
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Cat = mongoose.model("Cat", catSchema);

// Testing GET route
app.get("/", async (req, res) => {
  try {
    await connectDB(); // Ensure database connection

    const newCat = new Cat({ name: "julie" });
    const data = await newCat.save();

    res.send('Added a cat named "julie" to the database!');
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to add the cat.");
  }
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  let isAdmin = false;
  if (username === "admin@gmail.com") {
    isAdmin = true;
  }
  // Simple login logic - always return status true
  res.json({
    status: true,
    message: "Login successful",
    admin: isAdmin,
  });
});

app.post("/", async (req, res) => {
  try {
    await connectDB(); // Ensure database connection

    const { data } = req.body; // Get `data` field from the request body
    if (!data) {
      return res.status(400).send("Data field is required.");
    }

    const newCat = new Cat({ name: data });
    const savedCat = await newCat.save();

    res.status(201).send({
      message: "Cat added successfully",
      cat: savedCat,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to add the cat.");
  }
});

app.post("/admin/packages", async (req, res) => {
  try {
    // Destructure request body
    await connectDB();
    const { title, description, price, image, availableDates } = req.body;

    // Validate required fields
    if (!title || !description || !price || !image) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // Validate price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid price",
      });
    }

    // Validate image (ensure it's a valid Base64 string)
    if (!image.startsWith("data:image/")) {
      return res.status(400).json({
        status: "error",
        message: "Invalid image format",
      });
    }

    // Validate available dates
    if (
      !availableDates ||
      !Array.isArray(availableDates) ||
      availableDates.length === 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "At least one available date is required",
      });
    }

    // Validate each date range
    const validatedDates = availableDates.map((dateRange) => {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      // Check if dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error("Invalid date format");
      }

      // Ensure end date is after start date
      if (endDate <= startDate) {
        throw new Error("End date must be after start date");
      }

      return {
        startDate,
        endDate,
      };
    });

    // Create new tour package
    const newTourPackage = new TourPackage({
      title,
      description,
      price: parsedPrice,
      image,
      availableDates: validatedDates,
    });

    // Save to database
    const savedPackage = await newTourPackage.save();

    // Respond with created package
    res.status(201).json({
      status: "success",
      message: "Tour package created successfully",
      data: savedPackage,
    });
  } catch (error) {
    console.error("Error creating tour package:", error);

    // Handle specific validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Handle other errors
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.get("/packages", async (req, res) => {
  try {
    const packages = await TourPackage.find(); // Fetch all documents from the collection
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
});

// get perticular package
app.get("/packages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const package = await TourPackage.findById(id); // Fetch the document with the given ID

    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json(package);
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch package" });
  }
});

// delete package done by admin
app.delete("/admin/packages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await TourPackage.findByIdAndDelete(id); // Delete the document with the given ID

    if (!deletedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(`Error deleting package with ID ${id}:`, error);
    res.status(500).json({ error: "Failed to delete package" });
  }
});

// to book the package
app.post("/packages/book/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, numberOfTravelers, specialRequests } =
    req.body;

  try {
    console.log("Received booking request:", req.body); // Log incoming data

    const package = await TourPackage.findById(id);

    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }

    const newBooking = new Booking({
      name,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      packageId: id,
    });

    const savedBooking = await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking successful", booking: savedBooking });
  } catch (error) {
    console.error("Detailed Error creating booking:", error);
    res.status(500).json({
      error: "Failed to create booking",
      details: error.message,
      stack: error.stack,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
