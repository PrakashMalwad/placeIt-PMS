const mongoose = require("mongoose");
const User = require("./User");
const College = require("../college");
// Define the Student schema
const StudentSchema = new mongoose.Schema({
  aboutme: { type: String },
  dob: {
    type: Date,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  passingyear: {
    type: Date,
  },
  qualification: {
    type: String,
  },
  stream: { type: String },
  contactno: { type: Number },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  skills: [
    {
      skillName: { type: String },
      proficiency: { type: Number, min: 0, max: 100 },
    },
  ],
  designation: { type: String },
  resume: { type: String },
  isEligible: { type: Boolean, default: true },
  isPlaced: { type: Boolean, default: false },

  termsAccepted: { type: Boolean, default: false },
});

// Virtual for calculating age
StudentSchema.virtual("age").get(function () {
  if (this.dob) {
    const ageDiff = Date.now() - this.dob.getTime();
    const ageDate = new Date(ageDiff); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  return null;
});

// Ensuring virtual fields are serialized
StudentSchema.set("toJSON", { virtuals: true });
StudentSchema.set("toObject", { virtuals: true });

// Using the discriminator to extend the User model
const Student =
  mongoose.models.Student || User.discriminator("Student", StudentSchema);

module.exports = Student;
