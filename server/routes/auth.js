const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.json({
      message: "Login success",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// FETCH USER BY ID
router.get("/user/:id", async (req, res) => {
  const user = await User.findOne({ userId: req.params.id });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// GET ALL USERS (without passwords)
router.get("/users", async (req, res) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
});

module.exports = router;
