const express = require("express");
const {
  createActivity,
  removeAllActivity,
  leaveActivity,
  joinActivity,
  getActivitiesList,
  forbidAccessPeopleInActivity,
  invitePeople,
  removeOneActivity,
  getActivityById,
  editActivity,
  activityExpired,
  upcomingActivity,
  organizedActivity,
  likeActivityParticipated,
  noFriends,
  nextFiveActivity,
  lastFiveIntervention,
  getActivitiesByDate,
  removeUserFromActivity,
} = require("../../controllers/v1/EventControllers");
const { verifyAuthorizationToken } = require("../../utils");
const fileUpload = require("express-fileupload");
const router = express.Router();
const activityValidator = require("../../middleware/validators/activityValidator");
const validate = require("../../middleware/validators/validate");

router.post(
  "/activities/createactivity",
  //verifyAuthorizationToken,

  fileUpload(),
  createActivity
);

router.get("/activities/list", getActivitiesList);
router.get("/activities/by", getActivitiesByDate);

router.get("/activities/list/:id", getActivityById);

router.get("/activities/user/:id/expiredActivities", activityExpired);

router.get("/acitivities/user/:id/upcomingActivities", upcomingActivity);

router.get("/activitie/user/organize-activity/:id", organizedActivity);

router.get("/activities/user/like-activity/:id", likeActivityParticipated);

router.post("/activities/join", joinActivity);

router.get("/user/:userId/nextActivities", nextFiveActivity);

router.get("/user/activities/lastInterventions", lastFiveIntervention);

router.post("/activities/leave", leaveActivity);

router.post("/activities/removeUser", removeUserFromActivity);

router.post("/activities/invite", invitePeople);

router.get("/activity/:activityId/non-friends", noFriends);

router.put("/activities/update/:id", verifyAuthorizationToken, editActivity);

router.post(
  "/activities/forbidaccess",

  forbidAccessPeopleInActivity
);

router.delete(
  "/activities/remove",

  removeAllActivity
);
router.delete(
  "/activities/removeone/:id",

  removeOneActivity
);

module.exports = router;
