const CheckInOut = require("../model/CheckInOut");

const checkIn = async (req, res) => {
  try {
    let specificUserCheckin = await CheckInOut.find({ user: req.body.user });
    if (!specificUserCheckin.length) {
      let newCheckIn = new CheckInOut({
        user: req.body.user,
        checkin: Date.now(),
        checkout: null,
      });
      let checkedInSave = newCheckIn.save();
      return res.status(200).json(checkedInSave);
    } else {
      let checkedIn = await CheckInOut.find({ user: req.body.user }).sort(
        "-checkin"
      );
      console.log(checkedIn[0].checkout);
      if (checkedIn[0].checkout) {
        let newCheckIn = new CheckInOut({
          user: req.body.user,
          checkin: Date.now(),
          checkout: null,
        });
        let checkedInSave = newCheckIn.save();
        return res.status(200).json({message:"you have successfully checked in!"});
      } else {
        return res.status(400).json({
          message: "you need to checkout to checkin again!",
        });
      }
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      error: "server error",
    });
  }
};

const checkout = async (req, res) => {
  try {
    let checkedIn = await CheckInOut.find({ user: req.body.user }).sort(
      "-checkin"
    );
    if (checkedIn.length&&!checkedIn[0].checkout) {
      const checkoutDateTime = Date.now();
      let checkoutForExistingCheckin = await CheckInOut.findOneAndUpdate(
        { checkin: checkedIn[0].checkin },
        { $set: { checkout: checkoutDateTime } },
        { new: true }
      );
      return res.json(checkoutForExistingCheckin);
    } else {
      return res.status(400).json({
        message: "you need to checkin to checkout!",
      });
    }
  } catch (error) {
    console.log(error)
    // return res.status(500).json({
    //   error: error.message,
    // });
  }
};
module.exports = {
  checkIn,
  checkout,
};
