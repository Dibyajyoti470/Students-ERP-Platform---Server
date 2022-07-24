const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  universityID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide university name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
  },
  contactNo: {
    type: String,
    required: [true, "Please provide contact number"],
  },
});

module.exports = mongoose.model("University", UniversitySchema);
