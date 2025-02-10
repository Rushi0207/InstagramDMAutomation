const express = require("express");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch comments and auto-reply
router.get("/:mediaId", authMiddleware, commentController.fetchCommentsAndReply);

module.exports = router;