const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const analyticsRoutes = require("./routes/analyticsRoutes");
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes.js");
const commentRoutes = require("./routes/commentRoute.js");

dotenv.config();
const app = express();

console.log(process.env.INSTAGRAM_CLIENT_ID)
console.log("process.env.INSTAGRAM_CLIENT_SECRET",process.env.INSTAGRAM_CLIENT_SECRET)
console.log("ADMIN_EMAIL",process.env.ADMIN_EMAIL)

app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: "Too many requests, please try again later.",
});


app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/comments", apiLimiter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;