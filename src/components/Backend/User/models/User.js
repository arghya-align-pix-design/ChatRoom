const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true  },
  shortName: { type: String }, // New field to store initials
  email: { type: String, required: true, unique: true,lowercase: true, trim: true },
  password: { type: String }, // Add this if not already in your schema
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
