const fs = require("fs");
const path = require("path");

const log = (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile(path.join(__dirname, "../logs/activity.log"), logMessage, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
};

module.exports = { log };