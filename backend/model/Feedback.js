const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true }, // Tham chiếu đến model "account"
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "tests", required: true }, // Tham chiếu đến model "tests"
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);