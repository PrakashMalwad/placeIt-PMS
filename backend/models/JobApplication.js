const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  studentResume: { 
    type: String, 
   
  },
  drive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drive", 
    required: true,
  },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected", "Withdrawn"], 
    default: "Pending"
  },
  appliedDate: { 
    type: Date, 
    default: Date.now, 
    required: true
  }
});
    
module.exports = mongoose.model("JobApplication", jobApplicationSchema);
