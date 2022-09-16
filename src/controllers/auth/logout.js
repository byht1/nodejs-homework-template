const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const logOut = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, { token: "" });
  if (!result) {
    throw createError(401, "Not authorized");
  }

  res.status(204).json(id);
};

module.exports = logOut;
