const { StatusCodes } = require("http-status-codes");
const Admin = require("../../models/Admin");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const register = async (req, res) => {
  try {
    const user = await Admin.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.getName(),
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new BadRequestError("Please provide email and passwor");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new UnauthenticatedError("Invalid credentials!");
    }

    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials!");
    }

    const token = admin.createJWT();
    res.status(StatusCodes.OK).json({
      admin: {
        firstName: admin.firstName,
        middleName: admin.middleName ? admin.middleName : "",
        lastName: admin.lastName,
        id: admin._id,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
