const { StatusCodes } = require("http-status-codes");
const Course = require("../../models/Course");

const createCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      courseID: req.body.courseID,
    });

    if (course) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Course with ID: ${course.courseID} already exists!`,
      });
    }

    const newCourse = await Course.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({
      msg: `Course: ${newCourse.name} is created successfully.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getCourse = async (req, res) => {
  const { id: courseID } = req.params;
  try {
    const course = await Course.findById({ _id: courseID });
    if (!course) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Course with ID: ${courseID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ course });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
    }
    if (courses.length === 0) {
      res.status(StatusCodes.NO_CONTENT).json({ msg: "No courses available." });
    }
    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const updateCourse = async (req, res) => {
  const { id: courseID } = req.params;
  try {
    const course = await Course.findOneAndUpdate({ _id: courseID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Course with ID: ${courseID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ course });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id: courseID } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseID,
    });
    if (!course) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Course with ID: ${courseID} was not found.` });
    }
    res.status(StatusCodes.OK).json({
      msg: `Course with ID: ${courseID}, Name: ${course.name} is deleted successfully.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
