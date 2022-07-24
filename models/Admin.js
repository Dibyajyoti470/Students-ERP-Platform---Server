const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 3,
  },
  middleName: {
    type: String,
    minlength: 3,
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
  designation: {
    type: String,
    required: [true, "Please provide designation"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 4,
  },
});

AdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.getName = function () {
  return `${this.firstName} ${this.middleName + " "}${this.lastName}`;
};

AdminSchema.methods.createJWT = function () {
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

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", AdminSchema);
