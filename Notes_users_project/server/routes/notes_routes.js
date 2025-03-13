const express = require("express");
const router = express.Router();
const {
  get_all_notes,
  get_note,
  create_note,
  update_note,
  delete_note,
} = require("../controllers/notes_controllers");
const verify_jwt = require("../middleware/verify_jwt");

router.use(verify_jwt);

router
  .route("/")
  .get(get_all_notes)
  .post(create_note)
  .patch(update_note)
  .delete(delete_note);

router.route("/:id").get(get_note);

module.exports = router;
