const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TourPackageSchema = new mongoose.Schema(
  {
    _id: Number, // This will be our custom ID that starts from 1
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
    availableDates: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // Disable default _id generation
  }
);

// Plugin to auto-increment ID
TourPackageSchema.plugin(AutoIncrement, {
  id: "tour_package_counter",
  inc_field: "_id",
});

const TourPackage = mongoose.model("TourPackage", TourPackageSchema);

module.exports = TourPackage;
