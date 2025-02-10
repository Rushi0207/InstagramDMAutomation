import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeywordManager from "./KeywordManager";
import Analytics from "./Analytics";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.username}</h2>
      <div className="row">
        <div className="col-md-6">
          <KeywordManager />
        </div>
        <div className="col-md-6">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;