const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TourPackageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ✅ Only startDate
    availableDates: [
      {
        startDate: { type: Date, required: true },
      },
    ],

    durationDays: {
      type: Number,
      required: true, // important for "within 4 days"
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
    },

    // ✅ Multiple images
    images: {
      type: [String],
      required: true,
    },

    // ✅ Single string category
    category: {
      type: String, // e.g., "romantic", "adventure", "family"
      required: true,
      trim: true,
    },

    location: {
      country: String,
      city: String,
      region: String, // e.g., "Himalayas", "Goa Beach"
    },

    tags: [String], // keywords like "honeymoon", "trek", "water sports"

    isInternational: {
      type: Boolean,
      default: false,
    },
    embedding: { type: [Number], index: false },
  },
  { versionKey: false }
);

const TourPackage = mongoose.model("TourPackage", TourPackageSchema);

module.exports = TourPackage;
