const { StatusCodes } = require("http-status-codes");
const Faculty = require("../../models/Faculty");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");

const getProfile = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const faculty = await Faculty.findOne({ facultyID: id }).populate(
    "departmentID"
  );
  if (!faculty) {
    throw new NotFoundError(`Faculty with id: ${id} was not found.`);
  }
  const {
    facultyID,
    firstName,
    middleName,
    lastName,
    email,
    phoneNo,
    dateOfBirth,
    isFullTimeJob,
    departmentID: { departmentID, name },
    address,
  } = faculty;
  res.status(StatusCodes.OK).json({
    facultyID,
    firstName,
    middleName,
    lastName,
    email,
    phoneNo,
    dateOfBirth,
    isFullTimeJob,
    departmentID,
    departmentName: name,
    address,
  });
};

const updateProfile = async (req, res) => {
  res.send("Edit profile reached");
};

module.exports = {
  getProfile,
  updateProfile,
};
