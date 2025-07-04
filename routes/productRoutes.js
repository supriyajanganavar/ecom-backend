const express = require("express");
const {
  createProduct,
  getALLProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateProduct = require("../utils/validateProduct");

const productRouters = express.Router();

productRouters.post("/", validateProduct, createProduct);
productRouters.get("/", getALLProduct);
productRouters.get("/:id", getProductById);
productRouters.put("/:id", validateProduct, updateProduct);
productRouters.delete("/:id", deleteProduct);

module.exports = productRouters;
