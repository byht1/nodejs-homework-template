const signUp = require("./signup");
const logIn = require("./login");
const logOut = require("./logout");
const current = require("./current");
const upSubscription = require("./upSubscription");
const setAvatars = require("./setAvatars");

module.exports = {
  setAvatars,
  upSubscription,
  current,
  logOut,
  logIn,
  signUp,
};
