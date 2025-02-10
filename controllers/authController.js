const axios = require("axios");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.instagramLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Authorization code is required" });
  }

  try {
    // Format request data correctly
    const params = new URLSearchParams();
    params.append("client_id", process.env.INSTAGRAM_CLIENT_ID);
    params.append("client_secret", process.env.INSTAGRAM_CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", process.env.INSTAGRAM_REDIRECT_URI);
    params.append("code", code);

    const response = await axios.post("https://api.instagram.com/oauth/access_token", params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const { access_token, user_id } = response.data;

    // Save user in DB
    let user = await User.findOne({ instagramId: user_id });
    if (!user) {
      user = new User({ instagramId: user_id, accessToken: access_token });
    } else {
      user.accessToken = access_token;
    }
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Instagram login error:", err.response?.data || err.message);
    res.status(500).json({ message: "Login failed", error: err.response?.data || err.message });
  }
};
