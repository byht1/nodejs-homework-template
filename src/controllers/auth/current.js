const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const current = async (req, res) => {
  const { id, email, subscription } = req.user;
  const result = await User.findById(id);

  if (!result) {
    throw createError(401, "Not authorized");
  }

  res.json({ email, subscription });
};

module.exports = current;
