function MessageBubble({ message, userId }: any) {
  const isMe = message.senderId === userId;

  return (
    <div
      style={{
        textAlign: isMe ? "right" : "left",
        margin: "10px 0"
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "10px",
          background: isMe ? "#d1ffd6" : "#fff",
          borderRadius: 10,
          maxWidth: "60%"
        }}
      >
        {message.text}
      </span>
    </div>
  );
}

export default MessageBubble;
