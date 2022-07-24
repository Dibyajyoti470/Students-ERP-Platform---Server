require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// database connection
const connectDB = require("./db/connect");

const studentAuthRouter = require("./routes/student/auth");
const adminAuthRouter = require("./routes/admin/auth");
const adminDepartmentRouter = require("./routes/admin/department");
const adminCourseRouter = require("./routes/admin/course.js");

const authenticate = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/routeNotFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

// middlewares
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/student/auth", studentAuthRouter);
app.use("/admin/auth", adminAuthRouter);
app.use("/admin/department", authenticate, adminDepartmentRouter);
app.use("/admin/department/:id/course", authenticate, adminCourseRouter);

// error handlers
app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
