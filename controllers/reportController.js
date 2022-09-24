const CheckInOut = require("../model/CheckInOut");
const mongoose = require("mongoose");

const dailyReport = async (req, res) => {
  try {
      let userId = req.params.userId;
    CheckInOut.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          attendance_report: {
            $push: {
              checkin: "$checkin",
              checkout: "$checkout",
              user: "$user",
            },
          },
        },
      },
    ]).exec((error, result) => {
      res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

const weeklyReport = async (req, res) => {
  let startDate = req.body.startDate;
  let userId = req.params.userId;
  const result = CheckInOut.aggregate([
    {
      $match: {
        date: {
          $gte: getBeginningOfTheWeek(new Date()),
          $lt: new Date(`${startDate}T23:59:59.999Z`),
        },
        user: mongoose.Types.ObjectId(userId),
      },
    },
  ]).exec((err, result) => {
    res.json(result)
  });
};
const getBeginningOfTheWeek = (now) => {
  const days = (now.getDay() + 7 - 1) % 7;
  const newDay = now.setDate(now.getDate() - days);
  now.setHours(0, 0, 0, 0);
  return now;
};

const monthlyReport = async (req, res) => {
  let userId = req.params.userId;
  try {
    CheckInOut.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          attendance_report: { $push: { checkin: "$checkin", checkout: "$checkout", user:"$user" } },
        },
      },
    ]).exec((error, result) => {
      res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  dailyReport,
  weeklyReport,
  monthlyReport,
};
