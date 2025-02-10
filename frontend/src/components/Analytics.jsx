import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ dmsSent: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h3>Analytics</h3>
      <p>Total DMs Sent: {analytics.dmsSent}</p>
    </div>
  );
};

export default Analytics;