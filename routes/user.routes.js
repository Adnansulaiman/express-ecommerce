const express = require("express");

const {
  getUserDetails,
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  viewWishlist,
  deleteWishlist,
} = require("../controllers/user.controller");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserDetails);
router.put("/", protect, updateUserDetails);
router.post("/add-address", protect, addAddress);
router.put("/update-address/:id", protect, updateAddress);
router.delete("/delete-address/:id", protect, deleteAddress);
router.post('/wishlist/:id',protect,addToWishlist)
router.get('/wishlist/',protect,viewWishlist)
router.delete('/wishlist/:id',protect,deleteWishlist)




module.exports = router;
