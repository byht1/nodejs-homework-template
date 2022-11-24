const multer = require("multer");
const path = require("path");

const { basedir } = global;

const tempDir = path.join(basedir, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
