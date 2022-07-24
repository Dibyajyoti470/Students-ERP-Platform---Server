const { StatusCodes } = require("http-status-codes");
const Department = require("../../models/Department");

const createDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({
      departmentID: req.body.departmentID,
    });

    if (department) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Department with ID: ${department.departmentID} already exists!`,
      });
    }

    const newDepartment = await Department.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({
      msg: `Department: ${newDepartment.name} is created successfully.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getDepartment = async (req, res) => {
  const { id: deptID } = req.params;
  try {
    const department = await Department.findById({ _id: deptID });
    if (!department) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Department with ID: ${deptID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ department });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    if (!departments) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
    }
    if (departments.length === 0) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ msg: "No departments available." });
    }
    res.status(StatusCodes.OK).json({ departments });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const updateDepartment = async (req, res) => {
  const { id: deptID } = req.params;
  try {
    const department = await Department.findOneAndUpdate(
      { _id: deptID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!department) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Department with ID: ${deptID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ department });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  const { id: deptID } = req.params;
  try {
    const department = await Department.findOneAndDelete({
      _id: deptID,
    });
    if (!department) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Department with ID: ${deptID} was not found.` });
    }
    res.status(StatusCodes.OK).json({
      msg: `Department with ID: ${deptID}, Name: ${department.name} is deleted successfully.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
