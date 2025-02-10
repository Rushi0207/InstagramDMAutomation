const Analytics = require("../models/Analytics");

// Get analytics for a user
exports.getAnalytics = async (req, res) => {
  const userId = req.user.id;

  try {
    const analytics = await Analytics.findOne({ userId });
    if (!analytics) {
      return res.status(404).json({ message: "Analytics not found" });
    }

    res.status(200).json(analytics);
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};