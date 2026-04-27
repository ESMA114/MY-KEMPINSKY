const mongoose = require("mongoose");
const dns = require("node:dns/promises")
dns.setServers(["1.1.1.1"])

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected ");
  } catch (error) {
    console.error("DB error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;