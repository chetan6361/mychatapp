import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Sidebar({ onSelectUser }: any) {
  const { user } = useAuth()!;
  const [users, setUsers] = useState<any[]>([]);
  const [adding, setAdding] = useState(false);
  const [searchId, setSearchId] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/users");
      // remove the logged-in user from list
      setUsers(res.data.filter((u: any) => u.userId !== user.userId));
    };
    fetchUsers();
  }, []);

  // search user by userId
  const findUser = async () => {
    try {
      const res = await API.get(`/user/${searchId}`);
      onSelectUser(res.data);
      setAdding(false);
      setSearchId("");
    } catch {
      alert("User not found");
    }
  };

  return (
  <div
    style={{
      width: 300,
      height: "100vh",
      background: "#fff",
      borderRight: "1px solid #ddd",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <div
      style={{
        background: "#075E54",
        color: "white",
        padding: "15px",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      Chats
    </div>

    {/* User List */}
    <div style={{ flex: 1, overflowY: "auto" }}>
      {adding && (
        <div style={{ padding: 10 }}>
          <button
            onClick={findUser}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "20px",
              border: "none",
              background: "#25D366",
              color: "white",
              cursor: "pointer",
            }}
          >
            Start Chat
          </button>
        </div>
      )}

      {users.map((u) => (
        <div
          key={u.userId}
          onClick={() => onSelectUser(u)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 15px",
            cursor: "pointer",
            borderBottom: "1px solid #f2f2f2",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          {/* Avatar Circle */}
          <div
            style={{
              width: 40,
              height: 40,
              background: "#d9d9d9",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#555",
            }}
          >
            {u.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <div style={{ fontWeight: "500" }}>{u.name}</div>
            <div style={{ fontSize: "12px", color: "#777" }}>
              Tap to chat
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Sidebar;
