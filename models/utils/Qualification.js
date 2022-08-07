const mongoose = require("mongoose");

const QualificationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startedIn: {
    type: Date,
  },
  qualifiedIn: {
    type: Date,
  },
  certificate: {
    type: String,
  },
  percentage: {
    type: Number,
  },
  grade: {
    type: Number,
  },
});

module.exports = QualificationSchema;
