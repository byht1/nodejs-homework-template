const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { basedir } = global;

const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const avatarsDir = path.join(`${basedir}/../`, "public", "avatars");

const setAvatars = async (req, res) => {
  const { path: tempPath, originalname } = req.file;

  try {
    const { id } = req.user;
    const [extension] = originalname.split(".").reverse();
    const newName = `${id}.${extension}`;
    const uploadPath = path.join(avatarsDir, newName);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate({ _id: id }, { avatarURL });
    res.json(avatarURL);
    Jimp.read(uploadPath, (err, img) => {
      if (err) throw err;
      img.resize(250, 250).write(uploadPath);
    });
  } catch (error) {
    await fs.unlink(tempPath);
    createError(401, "Not authorized");
  }
};

module.exports = setAvatars;
