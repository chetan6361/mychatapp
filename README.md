MyChatApp – Real-Time Web Chat Application

This project is a web version of a mobile chat application, inspired by WhatsApp/Slack.

-------------------------------------------------------------

🚀 Features

- User login (pre-created users, no registration)
- Sidebar with chat contacts
- Real-time messaging (Socket.IO)
- Message history stored in MongoDB
- WhatsApp-style chat UI
- Auto-scroll to latest message
- Fully deployed and accessible online

-------------------------------------------------------------

🛠️ Tech Stack

Frontend
- React + TypeScript
- Vite
- Axios
- Socket.IO Client
- Context API

Backend
- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- bcrypt

Deployment
- Render (Backend)
- Vercel (Frontend)
- MongoDB Atlas

-------------------------------------------------------------

📁 Project Structure

mychatapp/
│
├── server/
│   ├── index.js
│   ├── package.json
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   └── .env   (NOT included in repo)
│
├── client/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── pages/
│       ├── components/
│       ├── context/
│       └── services/
│
└── README.md

-------------------------------------------------------------

✅ How to Run Locally (Any System)

Prerequisites

Install:
- Node.js
- MongoDB Atlas account or local MongoDB
- Git

-------------------------------------------------------------

1. Clone the Project

git clone https://github.com/chetan6361/mychatapp.git
cd mychatapp

-------------------------------------------------------------

2. Backend Setup

cd server
npm install

Create .env inside server/:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

Start backend:

npm run dev

Expected:

MongoDB connected
Server running on 5000

-------------------------------------------------------------

3. Frontend Setup

Open a new terminal:

cd client
npm install
npm run dev

Open in browser:

http://localhost:5173

-------------------------------------------------------------

✅ Login Credentials (Important for Reviewers)

Use any of the pre-created users:

userId: rahul001
password: pass123

userId: anu777
password: user123

-------------------------------------------------------------

🌍 Deployment

**Backend (Render)
https://mychatapp-xu23.onrender.com

Frontend (Vercel)
https://mychatapp-wheat.vercel.app**

-------------------------------------------------------------

🔁 Real-Time Messaging Flow

Client → socket.emit(sendMessage)
           ↓
        Server (Socket.IO)
           ↓
Server saves message to MongoDB
           ↓
Server broadcasts receiveMessage
           ↓
Client updates instantly

-------------------------------------------------------------

✅ Install on Another System

Anyone can run this project by:

git clone <repo>
cd server
npm install
cd ../client
npm install

Create .env in server and run:

npm run dev   (server)
npm run dev   (client)

-------------------------------------------------------------

✅ Possible Improvements

- Registration system
- Profile pictures
- Online/offline status
- Typing indicator
- Message read receipts
- Group chat
- File sharing
- Mobile friendly UI

-------------------------------------------------------------

👨‍💻 Developer
Chetan Naik

-------------------------------------------------------------

✅ Conclusion

This project successfully transforms a mobile-style chat application into a full web version with:

✅ Real-time communication
✅ Database integration
✅ Hosting & deployment
✅ Scalable architecture

-------------------------------------------------------------

**🌍 Check out the hosted real time website at: 

https://mychatapp-wheat.vercel.app**
