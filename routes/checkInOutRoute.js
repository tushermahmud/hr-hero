const router = require("express").Router();
const { checkIn, checkout } = require("../controllers/checkInOutController");
router.post("/checkin", checkIn);
router.post("/checkout", checkout);

module.exports = router;
