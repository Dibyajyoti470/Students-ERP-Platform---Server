const { StatusCodes } = require("http-status-codes");
const Faculty = require("../../models/Faculty");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

// const login = async (req, res) => {
//   res.send("Login faculty");
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const faculty = await Faculty.findOne({ email }).populate("departmentID");

    if (!faculty) {
      throw new UnauthenticatedError("Invalid credentials!");
    }

    const isPasswordCorrect = await faculty.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials!");
    }

    const token = faculty.createJWT();
    res.status(StatusCodes.OK).json({
      faculty: {
        firstName: faculty.firstName,
        middleName: faculty.middleName,
        lastName: faculty.lastName,
        id: faculty.facultyID,
        email: faculty.email,
        departmentID: faculty.departmentID.departmentID,
        departmentName: faculty.departmentID.name,
        phone: faculty.phoneNo,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
