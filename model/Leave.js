const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const LeaveSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  leaveDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const Leave = mongoose.model("Leave", LeaveSchema);
module.exports = Leave;
