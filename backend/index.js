const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = 3000;
// MongoDB connection function
const connectDB = require("./connect");

// Define schema and model
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Cat = mongoose.model("Cat", catSchema);

// GET route
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

// POST route
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
