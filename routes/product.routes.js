const express = require("express");

const upload = require('../uploads/multer.config')

const {
  getAllProducts,
  addProduct,
  getAProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");
const { protect, adminProtect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.post("/", protect, adminProtect, addProduct);
router.put("/:id", protect, adminProtect,upload.array('photos',12), updateProduct);
router.delete("/:id", protect, adminProtect, deleteProduct);

module.exports = router;

