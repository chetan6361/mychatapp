require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

async function addUsers() {
  try {
    const users = [
      {
        userId: "chetan123",
        name: "Chetan",
        password: await bcrypt.hash("pass123", 10)
      },
      {
        userId: "rahul001",
        name: "Rahul",
        password: await bcrypt.hash("pass123", 10)
      },
      {
        userId: "anu777",
        name: "Anu",
        password: await bcrypt.hash("user123", 10)
      }
    ];

    await User.insertMany(users);
    console.log("Sample users added!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

addUsers();
