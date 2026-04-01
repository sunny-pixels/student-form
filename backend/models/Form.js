const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  name: String,
  mobile: String,
});

const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  school: String,
});

const formSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  studentName: String,
  fatherName: String,
  motherName: String,
  mobile: String,
  address: String,
  schoolName: String,
  standard: String,
  schoolAddress: String,

  resultFile: String,
  aadharFile: String,

  familyMembers: [familySchema],
  students: [studentSchema],

}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);