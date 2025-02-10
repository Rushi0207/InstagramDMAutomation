const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get analytics for a user
router.get("/", authMiddleware, analyticsController.getAnalytics);

module.exports = router;