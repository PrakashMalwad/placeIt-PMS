const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  resultId: { type: mongoose.Schema.Types.ObjectId },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  testType: { type: String, required: true },
  score: { type: Number, required: true },
  dateTaken: { type: Date, required: true },
});

module.exports = mongoose.model("TestResult", testResultSchema);
