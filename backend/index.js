const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
let isConnected = false; // Track MongoDB connection status
const PORT = 3000;
// MongoDB connection function
async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Define schema and model
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Cat = mongoose.model("Cat", catSchema);

// Define routes
app.get("/", async (req, res) => {
  try {
    await connectToDatabase(); // Ensure database connection

    const newCat = new Cat({ name: "julie" });
    await newCat.save();

    res.send('Added a cat named "julie" to the database!');
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to add the cat.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
