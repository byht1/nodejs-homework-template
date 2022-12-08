const { User, emailSchema } = require("../../models/user");
const { v4: uuidv4 } = require("uuid");

const { createError, emailMessage } = require("../../helpers");

const verifyToRepeat = async (req, res) => {
  const { error } = emailSchema.validate(req.body);

  if (error) {
    throw createError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(400, "No such user exists");
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const verificationToken = uuidv4();

  await User.findByIdAndUpdate(user._id, {
    verificationToken,
  });

  await emailMessage(email, verificationToken);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = verifyToRepeat;
