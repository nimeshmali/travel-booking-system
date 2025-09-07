const multer = require("multer");

// Store files in memory before sending to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
