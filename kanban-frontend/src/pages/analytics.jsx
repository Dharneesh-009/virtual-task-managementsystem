import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Spinner,
  Alert
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/analytics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        setData(resData);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        console.error("Failed to fetch analytics:", err);
        setError("Failed to load analytics. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    pageWrapper: {
      backgroundColor: "#121212",
      color: "white",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "'Inter', sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "2rem",
      fontSize: "2rem",
      color: "#84cc16",
    },
    card: {
      backgroundColor: "#1e1e1e",
      color: "white",
      padding: "1.5rem",
      borderRadius: "16px",
      boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
      transition: "transform 0.2s ease",
    },
    cardTitle: {
      fontSize: "1.2rem",
      color: "#84cc16",
      marginBottom: "1rem",
    },
    cardValue: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#fff",
    },
    spinner: {
      textAlign: "center",
      marginTop: "3rem",
    },
    errorAlert: {
      backgroundColor: "#ef4444",
      color: "white",
      textAlign: "center",
      border: "none",
    },
    chartTitle: {
      textAlign: "center",
      marginTop: "3rem",
      fontSize: "1.5rem",
      color: "#84cc16",
    },
    chartWrapper: {
      backgroundColor: "#1e1e1e",
      padding: "2rem",
      borderRadius: "16px",
      marginTop: "2rem",
    },
  };

  const chartData = data
    ? [
        { name: "Total", value: data.totalTasks },
        { name: "Completed", value: data.completedTasks },
        { name: "In Progress", value: data.inProgressTasks },
        { name: "To Do", value: data.todoTasks },
      ]
    : [];

  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.heading}>📊 Task Analytics</h2>

      {loading ? (
        <div style={styles.spinner}>
          <Spinner animation="border" variant="success" />
          <p>Loading analytics...</p>
        </div>
      ) : error ? (
        <Alert style={styles.errorAlert}>{error}</Alert>
      ) : (
        <>
          <Row className="g-4">
            <Col md={3}>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Total Tasks</div>
                <div style={styles.cardValue}>{data.totalTasks}</div>
              </div>
            </Col>
            <Col md={3}>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Completed</div>
                <div style={{ ...styles.cardValue, color: "#22c55e" }}>
                  {data.completedTasks}
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div style={styles.card}>
                <div style={styles.cardTitle}>In Progress</div>
                <div style={{ ...styles.cardValue, color: "#facc15" }}>
                  {data.inProgressTasks}
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div style={styles.card}>
                <div style={styles.cardTitle}>To Do</div>
                <div style={{ ...styles.cardValue, color: "#38bdf8" }}>
                  {data.todoTasks}
                </div>
              </div>
            </Col>
          </Row>

          <div style={styles.chartWrapper}>
            <h4 style={styles.chartTitle}>📈 Task Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", color: "#fff" }}
                />
                <Bar dataKey="value" fill="#22c55e" barSize={40} radius={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
