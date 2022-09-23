const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
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
  role: {
    type: String,
  },
  time: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
