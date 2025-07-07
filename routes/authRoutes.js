const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
} = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

authRoutes.post("/logout", logoutUser);

authRoutes.get("/verify", verifyUser);

module.exports = authRoutes;
