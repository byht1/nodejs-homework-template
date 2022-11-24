const express = require("express");
const { basedir } = global;

const authCtrl = require(`${basedir}/controllers/auth`);
const { auth, upload } = require(`${basedir}/middleware`);
const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.post("/signup", ctrlWrapper(authCtrl.signUp));

router.post("/login", ctrlWrapper(authCtrl.logIn));

router.post("/verify", ctrlWrapper(authCtrl.verifyToRepeat));

router.get("/logout", auth, ctrlWrapper(authCtrl.logOut));

router.get("/current", auth, ctrlWrapper(authCtrl.current));

router.get("/verify/:verificationToken", ctrlWrapper(authCtrl.verify));

router.patch("/", auth, ctrlWrapper(authCtrl.upSubscription));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(authCtrl.setAvatars)
);

module.exports = router;
