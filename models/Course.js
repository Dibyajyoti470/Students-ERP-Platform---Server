const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: [true, "Please provide department name"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide department name"],
  },
  duration: {
    type: Number,
    required: [true, "Please provide duration"],
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: [true, "Please provide department"],
  },
  affiliatedTo: {
    type: mongoose.Types.ObjectId,
    ref: "University",
    required: [true, "Please provide affiliated university"],
  },
});

module.exports = mongoose.model("Course", CourseSchema);
