const mongoose = require("mongoose");

const cfStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    cfHandle: {
      type: String,
      required: true
    },

    currentRating: Number,
    maxRating: Number,

    totalSolved: Number,

    ratingWiseSolved: {
      type: Map,
      of: Number
    },

    tagWiseSolved: {
      type: Map,
      of: Number
    },

    ratingHistory: [
      {
        contest: String,
        rating: Number,
        date: Date
      }
    ],

    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CFStats", cfStatsSchema);
