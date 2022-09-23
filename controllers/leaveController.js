const Leave = require("../model/Leave");

const applyforleave = async (req, res) => {
  try {
    let { userId, leaveDate } = req.body;
    let mewLeave = new Leave({
      user: userId,
      leaveDate: leaveDate,
      status: "pending",
    });
    let leave = await mewLeave.save();
    return res.status(200).json(leave);
  } catch (error) {
    return res.status(500).json({ error: "Server Error!" });
  }
};

const processleaverequest = async (req, res) => {
  try {
    let processLeave = await Leave.findOneAndUpdate(
      { _id: req.body.leaveId },
      { $set: { status: req.body.approved ? "approved" : "denied" } },
      { new: true }
    );
    return res.status(200).json(processLeave);
  } catch (error) {
    return res.status(500).json({
      error: "Server error!",
    });
  }
};

module.exports = {
  applyforleave,
  processleaverequest,
};
