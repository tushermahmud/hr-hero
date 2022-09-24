const router = require("express").Router();
const {
  dailyReport,
  weeklyReport,
  monthlyReport,
} = require("../controllers/reportController");

router.get("/daily/:userId", dailyReport);
router.post("/weekly/:userId", weeklyReport);
router.get("/monthly/:userId", monthlyReport);

module.exports = router;
