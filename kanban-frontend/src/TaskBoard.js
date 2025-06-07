import React, { useState, useEffect } from "react";
import styles from './TaskBoard.module.css';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <h2>Profile</h2>
        <div>Username</div>
        <h2>Team Chat</h2>
        <div>Chat list here</div>
        <h2>Settings</h2>
        <div>Settings options here</div>
      </div>

      {/* Kanban Board (3 Columns) */}
      <div className={styles.board}>
        <div className={styles.column}>
          <h2><b>To Do</b></h2>
          {tasks.filter(t => t.status === "TODO").map(task => (
            <div key={task.id} className={styles.task}>
              {task.title}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <h2><b>In Progress</b></h2>
          {tasks.filter(t => t.status === "IN_PROGRESS").map(task => (
            <div key={task.id} className={styles.task}>
              {task.title}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <h2><b>Done</b></h2>
          {tasks.filter(t => t.status === "DONE").map(task => (
            <div key={task.id} className={styles.task}>
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


