const router = require("express").Router();
const { register, login } = require("../../controllers/student/auth");

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
