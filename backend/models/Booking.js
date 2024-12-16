const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const BookingSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    numberOfTravelers: {
      type: Number,
      required: true,
      min: 1,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    packageId: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false, // Disable default _id generation
  }
);

BookingSchema.plugin(AutoIncrement, {
  id: "booking_counter",
  inc_field: "_id",
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
