const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleAddNewUser,
  handleDeleteUser,
} = require("../controllers/user");

router.get("/", handleGetAllUsers);
router.post("/", handleAddNewUser);
router.delete("/", handleDeleteUser);

module.exports = router;
