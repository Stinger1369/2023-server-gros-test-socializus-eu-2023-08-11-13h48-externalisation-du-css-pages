const express = require("express");
const {
  getUserList,
  getUserInfo,
  getUserAvatarById,
  getavatarlistfromids,
  modifyUserInfo,
  getUserInfoByToken,
  tryAdmin,
  getEmail,
  setRole,
  getUserMale,
  getUserFemale,
  getFriendUserList,
  addFriends,
  updateMember,
} = require("../../controllers/v1/UserControllers");

const { verifyAuthorizationToken } = require("../../utils");
const router = express.Router();

router.get("/user/getuserlist", getUserList);

router.get("/admin", verifyAuthorizationToken, tryAdmin);

router.post(
  "/user/getavatarlistfromids",
  //verifyAuthorizationToken,
  getavatarlistfromids
);

router.get(
  "/user/getuserinfo/:id",
  //verifyAuthorizationToken,
  getUserInfo
);
router.put("/update-members", updateMember);
router.get("/user/get_user_avatar", getUserAvatarById);

router.post("/user/get-user-by-token", getUserInfoByToken);

router.put("/user/info/:id", verifyAuthorizationToken, modifyUserInfo);

router.get("/email", getEmail);

router.get("/user/sexe/male", getUserMale);

router.get("/user/sexe/female", getUserFemale);

router.get("/users/:userId/friends", getFriendUserList);

router.patch("/user/role/", setRole);

router.post("/user/friends/:id", addFriends);

module.exports = router;
