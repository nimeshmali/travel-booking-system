const express = require("express");
const router = express.Router();
const { createCheckoutSession, handleWebhook, getSessionStatus } = require("../controllers/paymentController");
const { authenticate } = require("../middleware/authMiddleware");

// Stripe webhook must receive raw body, so this route is defined separately
router.post("/webhook", handleWebhook);

router.post("/create-checkout/:id", authenticate, createCheckoutSession);
router.get("/session/:sessionId", authenticate, getSessionStatus);

module.exports = router;

