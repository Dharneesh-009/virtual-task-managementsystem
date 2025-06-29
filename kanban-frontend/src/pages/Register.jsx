import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", registerData);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}
    >
      <div
        className="shadow"
        style={{
          backgroundColor: "#1e1e1e",
          padding: "2rem",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px"
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: "bold"
          }}
        >
          Create Your Account
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-0"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-0"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-0"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(90deg, #22c55e, #84cc16)",
              color: "#121212",
              fontWeight: "bold"
            }}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#22c55e", cursor: "pointer", fontWeight: "bold" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
