const axios = require("axios");
const Keyword = require("../models/Keyword");
const User = require("../models/User");
const logger = require("../utils/logger");
const Analytics = require("../models/Analytics");
const { sendErrorEmail } = require("../utils/notifier");


// Fetch comments and auto-reply
exports.fetchCommentsAndReply = async (req, res) => {
  const { mediaId } = req.params;
  const userId = req.user.id;

  try {
    // Fetch user's access token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch comments using Instagram Graph API
    const commentsResponse = await axios.get(
      `https://graph.instagram.com/${mediaId}/comments`,
      {
        params: {
          access_token: user.accessToken,
        },
      }
    );

    const comments = commentsResponse.data.data;

    // Fetch keywords for the user
    const keywords = await Keyword.find({ userId });

// Check each comment for keywords
for (const comment of comments) {
  for (const keyword of keywords) {
    if (comment.text.includes(keyword.keyword)) {
      // Send DM
      await axios.post(
        `https://graph.instagram.com/${comment.from.id}/messages`,
        {
          message: keyword.message.replace(
            "{followername}",
            comment.from.username
          ),
        },
        {
          params: {
            access_token: user.accessToken,
          },
        }
      );

      // Log the sent DM
      logger.log(`DM sent to ${comment.from.username}`);

      // Update analytics
      let analytics = await Analytics.findOne({ userId });
      if (!analytics) {
        analytics = new Analytics({ userId, dmsSent: 1 });
      } else {
        analytics.dmsSent += 1;
      }
      await analytics.save();
    }
  }
}

    res.status(200).json({ message: "Comments processed successfully" });
  } catch (err) {
    console.error("Error fetching comments:", err);
    sendErrorEmail(err.message);
    res.status(500).json({ message: "Failed to process comments" });
  }
};