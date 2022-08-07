const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const QualificationSchema = require("./utils/Qualification");

const StudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: [true, "Please provide student ID"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 3,
  },
  middleName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 4,
  },
  phoneNo: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  address: {
    locality: {
      type: String,
      required: [true, "Please provide locality"],
    },
    city: {
      type: String,
      required: [true, "Please provide city"],
    },
    state: {
      type: String,
      required: [true, "Please provide state"],
    },
    pincode: {
      type: Number,
      required: [true, "Please provide pincode"],
    },
    country: {
      type: String,
      required: [true, "Please provide country"],
    },
  },
  enrolledAt: {
    type: Date,
    required: [true, "Please provide date"],
  },
  mode: {
    type: String,
    required: [true, "Please provide mode of course [Regular/Corresponding]"],
  },
  qualifications: {
    type: [QualificationSchema],
    default: [],
  },
  courseID: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: [true, "Please provide course ID"],
  },
});

StudentSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentSchema.methods.getName = function () {
  return `${this.firstName} ${this.middleName + " "}${this.lastName}`;
};

StudentSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.getName(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

StudentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Student", StudentSchema);
