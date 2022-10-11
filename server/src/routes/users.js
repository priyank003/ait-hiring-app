const express = require("express");
const router = express.Router();
const User = require("../models/user/user.mongo");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { httpGetAdminUsers } = require("../controller/users.controller");
const catchAsync = require("../utils/catchAsync");
const { v4: uuidv4 } = require("uuid");
router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const {
        username,
        email,
        lastname,
        firstname,
        year,
        branch,
        regId,
        password,
      } = req.body;

      const role = "student";

      const user = new User({
        userId: uuidv4(),
        username,
        email,
        lastname,
        firstname,
        year,
        branch,
        regId,
        role,
      });
      const registeredUser = await User.register(user, password);

      res.status(200).json({
        status: "ok",
        message: "successfully registerd",
        user_data: {
          username,
          email,
          lastname,
          firstname,
          year,
          branch,
          regId,
          role,
        },
      });
      console.log(registeredUser);
    } catch (err) {
      console.log(`Could not register user ${err}`);

      res.status(403).json({
        status: "not ok",
        message: "not registred",
      });
    }
  })
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in");
});

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/outlook",
  passport.authenticate("windowslive", {
    scope: [
      "openid",
      "profile",
      "offline_access",
      "https://outlook.office.com/Mail.Read",
    ],
  }),
  function (req, res) {
    // The request will be redirected to Outlook for authentication, so
    // this function will not be called.
  }
);

router.get(
  "/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/login" }),
  function (req, res) {
    res.cookie("authToken", req.user.token);
    res.redirect("/#/dashboard");
  }
);

router.get("/all-users", httpGetAdminUsers);

module.exports = router;
