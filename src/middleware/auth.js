const jwt = require("jsonwebtoken");

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const createError = require(`${basedir}/helpers/createError`);

const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(createError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      console.log(1);
      throw createError(401, "Not authorized");
    }
    req.user = user;

    next();
  } catch (error) {
    next(createError(401, "Not authorized"));
  }
};

module.exports = auth;
