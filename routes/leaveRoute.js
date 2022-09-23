const router = require("express").Router();
const {
  applyforleave,
  processleaverequest,
} = require("../controllers/leaveController");
const checkManager = require("../middlewares/checkManager");
router.post("/applyforleave", applyforleave);
router.post("/processleaverequest", checkManager, processleaverequest);

module.exports = router;
