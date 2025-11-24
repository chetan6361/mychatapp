require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const Message = require("./models/Message");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/", chatRoutes);

connectDB();

// Server + Socket
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

// SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    const msg = await Message.create(data);

    io.emit("receiveMessage", msg);  
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log("Server running on", PORT));
