const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
let isConnected = false; // Track MongoDB connection status
const PORT = 3000;
// MongoDB connection function
const connectDB = require("./connect");

// connectDB();
// Define schema and model
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Cat = mongoose.model("Cat", catSchema);

// Define routes
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
