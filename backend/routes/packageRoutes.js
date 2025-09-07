const express = require("express");
const router = express.Router();
const { getAllPackages, getPackageById, createPackage, deletePackage, suggestPackages } = require("../controllers/packageController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.post("/suggestPackages", suggestPackages);

// Admin routes
router.post("/", authenticate, authorizeAdmin(),upload.array("images", 5), createPackage);
router.delete("/:id", authenticate, authorizeAdmin(), deletePackage);

module.exports = router;
