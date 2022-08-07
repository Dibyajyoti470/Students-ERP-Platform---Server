const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  chapterNo: {
    type: Number,
  },
  name: {
    type: String,
  },
  weightage: {
    type: Number,
  },
});

const SubjectSchema = new mongoose.Schema({
  subjectID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  chapters: [ChapterSchema],
});

const SemesterSyllabusSchema = new mongoose.Schema({
  semesterNo: {
    type: Number,
  },
  subjects: {
    type: [SubjectSchema],
  },
});

const CourseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: [true, "Please provide course ID"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide course name"],
  },
  abbreviation: {
    type: String,
  },
  mode: {
    type: String,
    required: [true, "Please provide mode of course"],
  },
  durationInYears: {
    type: Number,
    required: [true, "Please provide duration"],
  },
  noOfSemesters: {
    type: Number,
    required: [true, "Please provide number of semesters"],
  },
  syllabus: {
    type: [SemesterSyllabusSchema],
    default: [],
  },
  departmentID: {
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
