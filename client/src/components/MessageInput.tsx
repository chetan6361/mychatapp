import { useState } from "react";

function MessageInput({ senderId, receiverId, socket }: any) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim() === "") return;

    const msg = { senderId, receiverId, text };

    socket.emit("sendMessage", msg); // send to server

    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        background: "#f0f2f5",
        borderTop: "1px solid #ddd",
        alignItems: "center",
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 15px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
          fontSize: "14px",
          background: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "#25D366",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
        }}
      >
        ➤
      </button>
    </div>
  );
}

export default MessageInput;
