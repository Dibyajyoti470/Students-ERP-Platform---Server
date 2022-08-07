const { StatusCodes } = require("http-status-codes");
const Student = require("../../models/Student");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const mongoose = require("mongoose");

const register = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body });
    const token = student.createJWT();
    res.status(StatusCodes.CREATED).json({
      student: {
        name: student.getName(),
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudent = async (req, res) => {
  //   const {courseID} = req.params;
  //   const { studentID } = req.query;
  const {
    params: { courseID },
    query: { studentID },
  } = req;
  try {
    let student;
    if (courseID) {
      student = await Student.findOne({
        $and: [{ _id: { $eq: studentID } }, { courseID: { $eq: courseID } }],
      });
    } else {
      student = await Student.findById(studentID);
    }
    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `Student with ID: ${studentID} was not found.`,
      });
    }
    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getAllStudents = async (req, res) => {
  const { courseID, deptID } = req.params;
  try {
    let students;
    if (courseID) {
      students = await Student.find({ courseID });
    } else if (deptID) {
      students = await Student.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseID",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $match: {
            "courseDetails.departmentID": mongoose.Types.ObjectId(deptID),
          },
        },
      ]);
    }
    if (!students || students.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No students available." });
    }
    return res
      .status(StatusCodes.OK)
      .json({ noOfStudents: students.length, students });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { studentID } = req.query;
  try {
    const student = await Student.findOneAndUpdate(
      { _id: studentID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Student with ID: ${studentID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = {
  register,
  getStudent,
  getAllStudents,
  updateStudent,
};
