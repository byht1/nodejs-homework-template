const { User, newUserSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { createError, emailMessage } = require("../../helpers");

const signUp = async (req, res) => {
  const { email, password, ...body } = req.body;
  const { error } = newUserSchema.validate(req.body);

  if (error) {
    throw createError(400, "error in the disability");
  }

  const isNewUser = await User.findOne({ email });

  if (isNewUser) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {
    protocol: "http",
    s: "250",
  });

  const verificationToken = uuidv4();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
    ...body,
  });

  await emailMessage(email, verificationToken);

  res.status(201).json(result);
};

module.exports = signUp;
