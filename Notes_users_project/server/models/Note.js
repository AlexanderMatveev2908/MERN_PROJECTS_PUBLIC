const mongoose = require("mongoose");
const auto_increment = require("mongoose-sequence")(mongoose);

const Note_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

Note_schema.plugin(auto_increment, {
  inc_field: "ticket",
  id: "ticket_num",
  start_seq: 500,
});

module.exports = mongoose.model("Note", Note_schema);
