const { StatusCodes } = require("http-status-codes");
const Faculty = require("../../models/Faculty");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const register = async (req, res) => {
  try {
    const faculty = await Faculty.create({ ...req.body });
    const token = faculty.createJWT();
    res.status(StatusCodes.CREATED).json({
      faculty: {
        name: faculty.getName(),
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getFaculty = async (req, res) => {
  const { facultyID } = req.params;
  try {
    const faculty = await Faculty.findById({ _id: facultyID });
    if (!faculty) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Faculty with ID: ${facultyID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ faculty });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getAllFaculties = async (req, res) => {
  const { deptID } = req.params;
  try {
    const faculties = await Faculty.find({ departmentID: deptID });
    if (!faculties || faculties.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No faculties available." });
    }
    res.status(StatusCodes.OK).json({ faculties });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const updateFaculty = async (req, res) => {
  const { facultyID } = req.params;
  try {
    const faculty = await Faculty.findOneAndUpdate(
      { _id: facultyID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!faculty) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Faculty with ID: ${facultyID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ faculty });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = {
  register,
  getFaculty,
  getAllFaculties,
  updateFaculty,
};
