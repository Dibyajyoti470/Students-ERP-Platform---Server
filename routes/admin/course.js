const router = require("express").Router();
const {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
} = require("../../controllers/admin/course");

router.route("/create").post(createCourse);
router.route("/view/:id").get(getCourse);
router.route("/view-all").get(getAllCourses);
router.route("/update/:id").patch(updateCourse);

module.exports = router;
