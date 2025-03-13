const express = require("express");
const router = express.Router();
const {
  get_all_users,
  create_user,
  update_user,
  delete_user,
  get_user,
} = require("../controllers/users_controllers");
const verify_jwt = require("../middleware/verify_jwt");

router.use(verify_jwt);

router
  .route("/")
  .get(get_all_users)
  .post(create_user)
  .patch(update_user)
  .delete(delete_user);

router.route("/:id").get(get_user);

module.exports = router;
