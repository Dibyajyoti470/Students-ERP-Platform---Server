const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const DepartmentSchema = new mongoose.Schema({
  departmentID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide department name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  contactNo: {
    type: String,
    required: [true, "Please provide contact number"],
  },
});

// DepartmentSchema.plugin(AutoIncrement, { inc_field: "departmentID" });

module.exports = mongoose.model("Department", DepartmentSchema);
