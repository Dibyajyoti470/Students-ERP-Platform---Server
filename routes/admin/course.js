const router = require("express").Router();
const {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../../controllers/admin/course");

router.route("/create").post(createCourse);
router.route("/view/:id").get(getCourse);
router.route("/view-all").get(getAllCourses);
router.route("/update/:id").patch(updateCourse);
router.route("/delete/:id").delete(deleteCourse);

module.exports = router;
