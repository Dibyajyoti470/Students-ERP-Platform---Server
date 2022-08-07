const router = require("express").Router();
const {
  getProfile,
  updateProfile,
} = require("../../controllers/faculty/profile");

router.route("/").get(getProfile);
router.route("/edit").patch(updateProfile);

module.exports = router;
