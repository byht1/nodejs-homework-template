const jwt = require("jsonwebtoken");

const { User, logInSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const { error } = logInSchema.validate(req.body);
  if (error) {
    throw createError(400, "error in the disability");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "user does not exist");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { ...req.body } });
};

module.exports = logIn;
