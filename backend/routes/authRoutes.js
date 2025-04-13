const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authControllers");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/signup", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);

module.exports = router;
