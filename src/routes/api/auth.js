const express = require("express");
const { basedir } = global;

const authCtrl = require(`${basedir}/controllers/auth`);
const { auth } = require(`${basedir}/middleware`);
const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.post("/signup", ctrlWrapper(authCtrl.signUp));

router.post("/login", ctrlWrapper(authCtrl.logIn));

router.get("/logout", auth, ctrlWrapper(authCtrl.logOut));

router.get("/current", auth, ctrlWrapper(authCtrl.current));

router.patch("/", auth, ctrlWrapper(authCtrl.upSubscription));

module.exports = router;
