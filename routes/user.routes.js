const express = require("express");

const {
  getUserDetails,
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/user.controller");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserDetails);
router.put("/", protect, updateUserDetails);
router.post("/add-address", protect, addAddress);
router.put("/update-address/:id", protect, updateAddress);
router.delete("/delete-address/:id", protect, deleteAddress);

module.exports = router;
