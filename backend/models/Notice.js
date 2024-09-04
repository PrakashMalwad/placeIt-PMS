const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  noticeId: { type: mongoose.Schema.Types.ObjectId },
  content: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  postedDate: { type: Date, required: true },
});

module.exports = mongoose.model("Notice", noticeSchema);
