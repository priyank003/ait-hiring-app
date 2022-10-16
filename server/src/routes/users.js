const express = require("express");
const router = express.Router();
const User = require("../models/user/user.mongo");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  httpGetAdminUsers,
  httpGetUserProfile,
} = require("../controller/users.controller");
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
        role,
      } = req.body;

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

      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to ait placement cell");
       
      });

      const userId = registeredUser.userId;

      const token = jwt.sign(
        {
          userId,
          email,
          role,
        },
        process.env.JWTSecretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        status: "ok",
        message: "successfully registerd",
        user_data: {
          userId,
          username,
          email,
          lastname,
          firstname,
          year,
          branch,
          regId,
          role,
          token,
        },
      });
     
    } catch (err) {
      console.log(`Could not register user ${err}`);

      res.status(403).json({
        status: "not ok",
        message: "not registred",
      });
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "welcome back");
    const redirectUrl = req.session.returnTo || "/dashboard";

    delete req.session.returnTo;

    const {
      email,
      username,
      lastname,
      firstname,
      year,
      branch,
      regId,
      role,
      userId,
    } = req.user;

    req.flash("welcome to placement cell");

    let token;

    try {
      token = jwt.sign(
        {
          userId,
          email,
        },
        process.env.JWTSecretKey,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(`Could not generate token ${err}`);
    }
  

    res.status(200).json({
      status: "ok",
      user_details: {
        userId,
        email,
        username,
        lastname,
        firstname,
        year,
        branch,
        regId,
        role,
        token,
      },
    });
  }
);

router.get("/user/profile/:userid", httpGetUserProfile);

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "GoodBye!");
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
