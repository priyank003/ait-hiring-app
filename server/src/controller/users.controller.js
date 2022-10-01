const User = require("../models/user/user.mongo");

const httpGetAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  httpGetAdminUsers,
};
