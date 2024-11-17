const express = require("express");
const {
  addToCart,
  getCart,
  resetCart,
  removeAProductInCart,
} = require("../controllers/cart.controllers");
const { protect } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/addcart", protect, addToCart);
router.get("/getcart", protect, getCart);
router.delete("/resetcart", protect, resetCart);
router.delete("/removecart/:id", protect, removeAProductInCart);

module.exports = router;
