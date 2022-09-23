const checkManager = (req, res, next) => {
  const manager = req.body.manager;
  if (!manager) {
    return res.status(400).json({
      message: "You must be a manager to add employee",
    });
  } else {
    next();
  }
};

module.exports = checkManager;
