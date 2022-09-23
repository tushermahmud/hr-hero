const router = require("express").Router();
const checkManager = require("../middlewares/checkManager");
const {
  getUsers,
  addUser,
  getUserById,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", checkManager, addUser);
router.get("/:userid", getUserById);

module.exports = router