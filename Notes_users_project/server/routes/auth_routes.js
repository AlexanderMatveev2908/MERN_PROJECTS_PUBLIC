const express = require("express");
const router = express.Router();
const auth_controllers = require("../controllers/auth_controllers");
const login_limiter = require("../middleware/login_limiter");

router.route("/").post(login_limiter, auth_controllers.login);

router.route("/refresh").get(auth_controllers.refresh);

router.route("/logout").post(auth_controllers.logout);

module.exports = router;
