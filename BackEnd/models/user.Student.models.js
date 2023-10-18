const mongoose = require("mongoose");
const db = require("../configDB/db");

const userSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    telephoneNumber: {
      type: String,
      required: true,
    },
    contractDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Student_info = mongoose.model("Student_info", userSchema); // แก้ไขนี้

module.exports = Student_info;
