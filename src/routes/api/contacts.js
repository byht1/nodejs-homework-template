const express = require("express");
const { basedir } = global;

const { auth } = require(`../../middleware`);

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));

router.put("/:contactId", auth, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  auth,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
