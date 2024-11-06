const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const feedbackSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: false },
});

const RideSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorName: String,
  passengers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      seatsBooked: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  feedbacks: [feedbackSchema],
  from: { type: String, required: true },
  to: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  carDetails: { type: String, required: true },
});

module.exports = mongoose.model("Ride", RideSchema);
