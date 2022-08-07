const router = require("express").Router();
const {
  createUniversity,
  getUniversity,
  getAllUniversities,
  updateUniversity,
  deleteUniversity,
} = require("../../controllers/admin/university");

router.route("/create").post(createUniversity);
router.route("/view/:id").get(getUniversity);
router.route("/view-all").get(getAllUniversities);
router.route("/update/:id").patch(updateUniversity);
router.route("/delete/:id").delete(deleteUniversity);

module.exports = router;
