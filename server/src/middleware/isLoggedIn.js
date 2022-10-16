const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(" ")[1]; //Authorization:'BearerToken'
  //   if (!token) {
  //     throw new Error("Authentication failed");
  //   }
  // } catch (err) {
  //   const error = new HttpError("Authentication failed!", 401);
  //   return next(error);
  // }
  console.log("REQ,USER...", req.user);
  if (!req.isAuthenticated()) {
    console.log("you must be signed in");
    req.flash("error", "you must be signed in");
    // const error = new HttpError("Authentication failed!", 401);
    // return next(error);
    // res.redirect("/login");
  }
  next();
};
