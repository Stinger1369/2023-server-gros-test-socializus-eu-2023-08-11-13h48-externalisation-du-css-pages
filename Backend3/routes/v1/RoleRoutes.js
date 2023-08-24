const express = require("express");

const {
  createRole,
  updateRole,
  getRoles,
} = require("../../controllers/v1/RoleControllers");

const { verifyAuthorizationToken } = require("../../utils");
const router = express.Router();

// route pour creer un role
router.post("/create-role", createRole);
router.put("/update-role/:id", updateRole);
router.get("/get-roles", getRoles);
module.exports = router;