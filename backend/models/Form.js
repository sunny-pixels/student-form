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
  studentName: String,
  fatherName: String,
  motherName: String,
  mobile: String,
  address: String,
  schoolName: String,
  standard: String,
  schoolAddress: String,

  familyMembers: [familySchema],
  students: [studentSchema],

}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);