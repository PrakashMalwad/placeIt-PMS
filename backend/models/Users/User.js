const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "student",
      "placementcell-coordinator",
      "company-coordinator",
      "admin",
    ],
    default: "student",
  },
  profileImg: {
    type: String, 
    trim: true,    
  },
  status: {
    type: Number,
    enum: [0, 1, 2], // 0 - not active, 1 - active, 2 - not verified
    default: 2,
  },
});

module.exports = mongoose.model("User", UserSchema);
