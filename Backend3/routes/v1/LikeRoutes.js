const express = require("express");

const {
  likeUser,
  userWhoReceiveLike,
  getUserLikeById,
  unlikeUser,
  getAllLikeByAUser,
  likeActivity,
  unlikeActivity,
  getUserWhoLikeActivity,
  dislikeActivity,
} = require("../../controllers/v1/LikeControllers");

const { verifyAuthorizationToken } = require("../../utils");
const router = express.Router();

// route pour creer un role
router.post("/user/like/:id", likeUser);

router.post("/activity/unlike/:id", unlikeActivity);

router.post("/activity/like/:id", likeActivity);

router.post("/activity/dislike/:id", dislikeActivity);

router.put("/removeLike/:userId/:likedUserId", unlikeUser);

router.get("/users/likes", userWhoReceiveLike);

router.get("/likes/:userId", getUserLikeById);

router.get("/activity/:id/likes", getUserWhoLikeActivity);

router.get("/:userId/likes", getAllLikeByAUser);

// router.delete(unlikeActivity);

// router.delete(unlikeUser);

module.exports = router;
