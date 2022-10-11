const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    // outlookId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
  },
  {
    strict: false,
  }
);
let myOptions = {
  usernameField: "email",
};

UserSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

UserSchema.methods.verifyPassword = function (password) {
  let pwd = password.toString();
  const result = bcrypt.compareSync(
    pwd,
    "46bfb3f4d8de06b563c7c1459f77e5666fb440476ea2abdf6aaef5b9f1656141859ca37093d2dda8ee9e0482ec5038bcc9b3e65a765a6c91ae170fc818a1ba6c7351a78caf7911afd73f2e3ca31cf66aa478dda635a6bc7d8704634c3cee682cf33764f6b202a0f44e1e8d0934015284ee8b49fe325c768c631f9406fb13bb19f7517265a05ae96e80ebbac43f2c82d889609193948ab479d5ae3001c6e1acecd7d1419894ca6424abb31269581aaa653f3a0e9af269978e0949c6a91bddb3d95e05dc97855195f60aee32bf0a73b15c3bf70b37ee250f64c8047ffa28ee7864d879909ff51b0d6a6d5a2200380c2be9a62ec00f7f55d63c4e050685302fef9d6b5db80b9f1617588c35a6505fb48ca2db203671de9e04005041f919a0cbc403a9478c175233f314199d96df6eb93010f0e3bbbc701144fc5b148be68b24de1be24d097ae31e91eb6d9e7580aa7c0525d851ba44993167230e2a234b8b646645b083bd6328a6ace28c91e060e5c191bd0ec9a63aeb3b39ca827c950e4f8d10cb4eeb25b7de661bedecdef75cfb23b14566653324f8376d6c9a723540d965a1b96a861f9cbb3499c80bbeab4ef2305d49fd22a5fe1b41c403e54fc24056d4163117415b3aad1cbe1645ae21e5657fd1082d9cc6f30953ecd956665b6e14615e7e889a1b01dfcaf1cbe862cce0d8a3c660249b86a33eaa4b3449ab1c8b5f84b6b1"
  );
  console.log(result);
  // callback(bcrypt.compareSync(password, this.hash));
};

module.exports = mongoose.model("User", UserSchema);
