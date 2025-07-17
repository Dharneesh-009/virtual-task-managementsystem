import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
      });
  }, []);

  const styles = {
    wrapper: {
      backgroundColor: "#121212",
      color: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "'Inter', sans-serif",
    },
    container: {
      backgroundColor: "#1e1e1e",
      padding: "2rem",
      borderRadius: "16px",
      maxWidth: "700px",
      margin: "3rem auto",
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.15)",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      background: "linear-gradient(90deg, #22c55e, #84cc16)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    emptyText: {
      textAlign: "center",
      color: "#999",
      fontStyle: "italic",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      backgroundColor: "#2c2c2c",
      padding: "1rem 1.2rem",
      borderRadius: "12px",
      marginBottom: "0.8rem",
      borderLeft: "5px solid #22c55e",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s ease, background 0.3s",
      cursor: "pointer",
    },
    itemHover: {
      backgroundColor: "#333",
      transform: "translateY(-2px)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🔔 Notifications</h2>
        {notifications.length === 0 ? (
          <p style={styles.emptyText}>No notifications available</p>
        ) : (
          <ul style={styles.list}>
            {notifications.map((note, idx) => (
              <li
                key={idx}
                style={styles.item}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, styles.itemHover)
                }
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, styles.item)
                }
              >
                {note.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
