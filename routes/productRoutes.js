const express = require("express");
const {
  createProduct,
  getALLProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateProduct = require("../utils/validateProduct");
const { isAuth, isAdmin } = require("../middlewares/authMiddlewares");

const productRouters = express.Router();

productRouters.post("/", isAuth, validateProduct, createProduct);
productRouters.get("/", isAuth, getALLProduct);
productRouters.get("/:id", isAuth, getProductById);
productRouters.put("/:id", isAuth, isAdmin, validateProduct, updateProduct);
productRouters.delete("/:id", deleteProduct);

module.exports = productRouters;
