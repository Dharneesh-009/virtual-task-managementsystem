import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: Invalid credentials");
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }} className="d-flex justify-content-center align-items-center">
      <div
        className="shadow"
        style={{
          backgroundColor: "#1e1e1e",
          padding: "2rem",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h2 className="text-center mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: "bold" }}>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(90deg, #22c55e, #84cc16)",
              color: "#121212",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#22c55e", cursor: "pointer", fontWeight: "bold" }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
