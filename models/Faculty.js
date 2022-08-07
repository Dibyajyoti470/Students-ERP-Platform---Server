const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
});

const FacultySchema = new mongoose.Schema({
  facultyID: {
    type: String,
    required: [true, "Please provide faculty ID"],
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
  joinedAt: {
    type: Date,
    required: [true, "Please provide date"],
  },
  designation: {
    type: String,
    required: [true, "Please provide designation"],
  },
  isFullTimeJob: {
    type: Boolean,
    required: [true, "Please provide if full time or not"],
  },
  qualifications: {
    type: [QualificationSchema],
    default: [],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 4,
  },
  hasResigned: {
    type: Boolean,
  },
  resignedAt: {
    type: Date,
  },
  departmentID: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: [true, "Please provide department"],
  },
});

FacultySchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

FacultySchema.methods.getName = function () {
  return `${this.firstName} ${this.middleName + " "}${this.lastName}`;
};

FacultySchema.methods.createJWT = function () {
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

FacultySchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Faculty", FacultySchema);
