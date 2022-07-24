const router = require("express").Router();
const {
  createDepartment,
  getDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../../controllers/admin/department");

router.route("/create").post(createDepartment);
router.route("/view/:id").get(getDepartment);
router.route("/view-all").get(getAllDepartments);
router.route("/update/:id").patch(updateDepartment);
router.route("/delete/:id").delete(deleteDepartment);

module.exports = router;
