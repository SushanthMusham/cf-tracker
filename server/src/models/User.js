const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    cfHandle: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt fields
  }
);
const User = mongoose.model('User', userSchema);

module.exports = User;