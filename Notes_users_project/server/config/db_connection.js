const mongoose = require("mongoose");

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(`=> connection failed: ${err.message}`);
  }
};

module.exports = connect_DB;
