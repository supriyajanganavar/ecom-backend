const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRouters = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Server is running fine and good",
  });
});
app.use("/products", productRouters);

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
