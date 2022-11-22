const { User, subscriptionSchema } = require("../../models/user");

const { createError } = require("../../helpers");

const upSubscription = async (req, res) => {
  const body = req.body;
  const { error } = subscriptionSchema.validate(body);
  if (error) {
    throw createError(401);
  }

  const { id } = req.user;

  const result = await User.findByIdAndUpdate(id, body, { new: true });

  res.json(result);
};

module.exports = upSubscription;
