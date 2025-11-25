import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import MessageInput from "../components/MessageInput";
import MessageBubble from "../components/MessageBubble";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import API from "../services/api";

const socket = io("https://mychatapp-xu23.onrender.com");


function Chat() {
  const { user } = useAuth()!;
  const [currentChatUser, setCurrentChatUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // -------------------------------
  // FIX: socket listener added once
  // -------------------------------
  useEffect(() => {
    const handler = (msg: any) => {
      if (!currentChatUser) return;

      // show only messages belonging to this chat
      const isMsgForCurrentChat =
        (msg.senderId === user.userId &&
          msg.receiverId === currentChatUser.userId) ||
        (msg.senderId === currentChatUser.userId &&
          msg.receiverId === user.userId);

      if (isMsgForCurrentChat) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handler);

    // clean-up → prevents multiple listeners
    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [currentChatUser, user.userId]);

  // auto scroll bottom
  useEffect(() => {
    const div = document.getElementById("chatBox");
    if (div) div.scrollTop = div.scrollHeight;
  }, [messages]);

  // fetch chat history
  const selectUser = async (u: any) => {
    setCurrentChatUser(u);

    const res = await API.get(
      `/messages/${user.userId}/${u.userId}`
    );
    setMessages(res.data);
  };

  return (
  <div style={{ display: "flex", height: "100vh", background: "#ededed" }}>
    <Sidebar onSelectUser={selectUser} />

    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {currentChatUser ? (
        <>
          {/* HEADER */}
          <div
            style={{
              background: "#075E54",
              color: "white",
              padding: "12px 15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              borderLeft: "1px solid #064C45",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#d9d9d9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#555",
                fontSize: 15,
              }}
            >
              {currentChatUser.name.charAt(0).toUpperCase()}
            </div>

            <div style={{ flex: 1 }}>
              {currentChatUser.name}
              <div style={{ fontSize: 12, fontWeight: "normal" }}>
                online
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div
            id="chatBox"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px 20px",
              backgroundImage:
                "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", // WhatsApp light wallpaper
              backgroundSize: "contain",
            }}
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} userId={user.userId} />
            ))}
          </div>

          {/* INPUT */}
          <MessageInput
            senderId={user.userId}
            receiverId={currentChatUser.userId}
            socket={socket}
            addMessage={(msg: any) => setMessages((prev) => [...prev, msg])}
          />
        </>
      ) : (
        // EMPTY STATE
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            color: "#777",
            background: "#f8f9fa",
          }}
        >
          Select a chat to start messaging
        </div>
      )}
    </div>
  </div>
);

}

export default Chat;
