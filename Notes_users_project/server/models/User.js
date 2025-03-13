const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["employee"],
  },

  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", User_schema);
