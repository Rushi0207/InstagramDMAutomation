import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Redirect to Instagram OAuth URL
      window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Instagram Auto-Reply Tool</h2>
      <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login with Instagram"}
      </button>
    </div>
  );
};

export default Login;