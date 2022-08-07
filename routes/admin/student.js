const router = require("express").Router({ mergeParams: true });
const {
  register,
  getStudent,
  getAllStudents,
  updateStudent,
} = require("../../controllers/admin/student");

router.route("/register").post(register);
router.route("/view").get(getStudent);
router.route("/view-all").get(getAllStudents);
router.route("/update").patch(updateStudent);

module.exports = router;
