import React, { useState, useEffect } from "react";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h2><b>To Do</b></h2>
        {tasks.filter(t => t.status === "TODO").map(task => (
          <div key={task.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
            {task.title}
          </div>
        ))}
      </div>
      <div>
        <h2><b> Done</b></h2>
        {tasks.filter(t => t.status === "DONE").map(task => (
          <div key={task.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}

