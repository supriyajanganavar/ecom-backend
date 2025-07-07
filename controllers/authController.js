const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { sendRegistrationEmail } = require("../utils/email");

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields:name,email and password",
      });
    }
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        meesage: "User already exists with this email ",
      });
    }
    const newUser = await User.create({
      email,
      password,
    });

    await sendRegistrationMail({
      to: newUser.email,
      email: newUser.email,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Something went wrong while registering the user",
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1H" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      message: "Something went wrong while logging in the user",
    });
  }
};
const logoutUser = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      authenticated: false,
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      authenticated: true,
      user: decoded,
    });
  } catch (err) {
    res.status(401).json({
      authenticated: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
};
