const User = require("../models/user/user.mongo");

const httpGetAdminUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

const httpGetUserProfile = async (req, res) => {
  const userId = req.params.userid;

  try {
    const user = await User.findOne({ userId });
    res.status(200).json(user);
  } catch (err) {
    console.log(`Could not get user details ${err}`);
    res.status(404).json({
      status: "not ok",
      message: "user not found",
    });
  }
};

module.exports = {
  httpGetAdminUsers,
  httpGetUserProfile,
};
