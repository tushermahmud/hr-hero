const User = require("../model/User");
const getUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).json(users)
  } catch (e) {
    res.status(400).json(e);
  }
};


const addUser = async (req, res) => {
  //see if the user exists
  const { name, email, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      let user = new User({
        name: name,
        email: email,
        role: role,
      });
      let newUser = await user.save();
      return res.status(200).json({
        user: newUser,
      });
    } else {
      return res.status(400).json({
        error: "user already exists",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: "server error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.userid);
    if (user) {
      res.status(200).json({
        user: user,
      });
    } else {
      return res.status(404).json({
        message: "user not found !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  getUserById,
};
