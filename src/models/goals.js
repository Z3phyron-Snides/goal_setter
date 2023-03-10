const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    goal: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
