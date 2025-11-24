const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get chat messages between two users
router.get("/messages/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  }).sort({ timestamp: 1 });

  res.json(messages);
});

module.exports = router;
