const express = require("express");
const router = express.Router();
const User = require("../models/user/user.mongo");
const passport = require("passport");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  
  const { username, email, password } = req.body;
  const user = new User({ email, username });
  
  const registeredUser = await User.register(user, password);

  
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
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
    // jwt.sign(
    //   { user: req.user },
    //   "secretKey",
    //   { expiresIn: "1h" },
    //   (err, token) => {
    //     if (err) {
    //       return res.json({
    //         token: null,
    //       });
    //     }

    //     res.json({
    //       token,
    //     });
    //   }
    // );
   
    res.cookie("authToken", req.user.token);
    res.redirect("/#/dashboard");
  }
);

module.exports = router;