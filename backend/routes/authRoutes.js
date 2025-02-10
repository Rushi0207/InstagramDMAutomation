const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Instagram OAuth login
router.post("/login", authController.instagramLogin);

module.exports = router;