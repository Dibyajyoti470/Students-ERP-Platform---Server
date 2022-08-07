const router = require("express").Router({ mergeParams: true });
const {
  register,
  getFaculty,
  getAllFaculties,
  updateFaculty,
} = require("../../controllers/admin/faculty");

router.route("/register").post(register);
router.route("/view/:facultyID").get(getFaculty);
router.route("/view-all").get(getAllFaculties);
router.route("/update/:facultyID").patch(updateFaculty);

module.exports = router;
