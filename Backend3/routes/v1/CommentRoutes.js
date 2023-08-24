const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getCommentsByActivity,
  createComment,
  // updateComment,
  deleteComment
} = require("../../controllers/v1/CommentControllers");
const commentValidator = require("../../middleware/validators/comment.validator");
const validate = require("../../middleware/validators/validate");

router.get("/comments/get-all-comments", getAllComments);
router.get("/comments/:id", getCommentsByActivity);
router.post(
  "/comments/create",
  validate(commentValidator),
  createComment
);
// router.patch("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

module.exports = router;
