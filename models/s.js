const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const schoolSchema = new mongoose.Schema({
  name: String,
  studentsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Student = mongoose.model("Student", studentSchema);
const School = mongoose.model("School", schoolSchema);

module.exports = { School, Student };
