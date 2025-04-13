const express = require("express");
const router = express.Router();
const { getAllPackages, getPackageById, createPackage, deletePackage } = require("../controllers/packageController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllPackages);
router.get("/:id", getPackageById);

// Admin routes
router.post("/", authenticate, authorizeAdmin, createPackage);
router.delete("/:id", authenticate, authorizeAdmin, deletePackage);

module.exports = router;
