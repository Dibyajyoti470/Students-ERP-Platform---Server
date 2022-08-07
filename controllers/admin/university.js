const { StatusCodes } = require("http-status-codes");
const University = require("../../models/University");

const createUniversity = async (req, res) => {
  try {
    const university = await University.findOne({
      universityID: req.body.universityID,
    });

    if (university) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: `University with ID: ${university.universityID} already exists!`,
      });
    }

    const newUniversity = await University.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({
      msg: `University: ${newUniversity.name} is created successfully.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getUniversity = async (req, res) => {
  const { id: universityID } = req.params;
  try {
    const university = await University.findById({ _id: universityID });
    if (!university) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `University with ID: ${universityID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ university });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    if (!universities) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
    }
    if (universities.length === 0) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ msg: "No universities available." });
    }
    res.status(StatusCodes.OK).json({ universities });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const updateUniversity = async (req, res) => {
  const { id: universityID } = req.params;
  try {
    const university = await University.findOneAndUpdate(
      { _id: universityID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!university) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `University with ID: ${universityID} was not found.` });
    }
    res.status(StatusCodes.OK).json({ university });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const deleteUniversity = async (req, res) => {
  const { id: universityID } = req.params;
  try {
    const university = await University.findOneAndDelete({
      _id: universityID,
    });
    if (!university) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `University with ID: ${universityID} was not found.` });
    }
    res.status(StatusCodes.OK).json({
      msg: `University with ID: ${universityID}, Name: ${university.name} is deleted successfully.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = {
  createUniversity,
  getUniversity,
  getAllUniversities,
  updateUniversity,
  deleteUniversity,
};
