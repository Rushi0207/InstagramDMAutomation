const app = require("./app.js");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");

dotenv.config();

console.log("INSTAGRAM_CLIENT_ID:", process.env.INSTAGRAM_CLIENT_ID);
console.log("INSTAGRAM_CLIENT_SECRET:", process.env.INSTAGRAM_CLIENT_SECRET);
console.log("INSTAGRAM_REDIRECT_URI:", process.env.INSTAGRAM_REDIRECT_URI);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});