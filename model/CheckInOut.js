const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const checkInOutSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  checkin: {
    type: Date,
  },
  checkout: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const CheckInOut = mongoose.model("CheckInOut", checkInOutSchema);
module.exports = CheckInOut;
