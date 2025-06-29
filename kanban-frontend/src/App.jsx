import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskBoard from "./pages/TaskBoard";

function App() {
  return (
    <div className="min-vh-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />          {/* 👈 Landing page comes first */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<TaskBoard />} />
      </Routes>
    </div>
  );
}

export default App;
