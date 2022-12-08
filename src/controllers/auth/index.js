const signUp = require("./signup");
const logIn = require("./login");
const logOut = require("./logout");
const current = require("./current");
const upSubscription = require("./upSubscription");
const setAvatars = require("./setAvatars");
const verify = require("./verify");
const verifyToRepeat = require("./verifyToRepeat");

module.exports = {
  verifyToRepeat,
  verify,
  setAvatars,
  upSubscription,
  current,
  logOut,
  logIn,
  signUp,
};
