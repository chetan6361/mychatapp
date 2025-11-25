import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth()!;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { userId, password });
      setUser(res.data.user);
      navigate("/chat");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          className="logo"
          alt="whatsapp"
        />

        <h2 className="title">myChatApp Login</h2>

        <input
          className="input"
          placeholder="Phone number or User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleLogin}>Login</button>

        <p className="footer-text">Secure & encrypted</p>
      </div>
    </div>
  );
}

export default Login;
