const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define a schema for the "cats" collection
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Create a model for the schema
const Cat = mongoose.model("Cat", catSchema);

// Define a route to handle GET requests
app.get("/", async (req, res) => {
  try {
    // Create and save a new cat document
    const newCat = new Cat({ name: "julie" });
    await newCat.save();

    res.status(200).send('Added a cat named "julie" to the database!');
  } catch (err) {
    console.error("Error while saving the cat:", err);
    res.status(500).send("Failed to add the cat.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
