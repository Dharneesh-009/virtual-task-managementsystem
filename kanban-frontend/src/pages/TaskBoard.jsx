import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaHome,  FaBell, FaChartBar, FaSignOutAlt,  FaUserCircle} from "react-icons/fa";
import styles from './TaskBoard.module.css';
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function TaskBoard({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO"
  });

  // Decode token for username
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [token, navigate]);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch tasks from backend
 useEffect(() => {
  fetch("http://localhost:8080/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    })
    .then((data) => setTasks(data))
    .catch((err) => {
      console.error("Error fetching tasks:", err);
      alert("Failed to load tasks. Please login again or check your server.");
    });
}, [token]);


  // Get task metadata
  const getTaskMeta = (task) => {
    if (task.status === "TODO") return { label: "Todo", avatar: true };
    if (task.status === "IN_PROGRESS") return { label: "In Progress", color: "#ff5f7e" };
    if (task.status === "DONE") return { label: "Done", color: "#34c759" };
    return {};
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (taskToUpdate) {
      fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...taskToUpdate, status: newStatus })
      })
        .then(res => res.json())
        .then(updatedTask => {
          setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        })
        .catch(err => console.error("Error updating task:", err));
    }
  };

  // Delete task
  const handleDelete = (taskId) => {
    if (window.confirm("Delete this task?")) {
      fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          setTasks(tasks.filter(t => t.id !== taskId));
        })
        .catch(err => console.error("Error deleting task:", err));
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Create new task
  const handleCreateTask = async () => {
    try {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error creating task");
      }

      const task = await res.json();
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "", status: "TODO" });
      setShowModal(false);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task: " + err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.profile}>
            <div className={styles.avatar}></div>
            <div className={styles.username}>{username}</div>
          </div>
          <nav className={styles.nav}>
            <Link to="/dashboard" className={styles.active}><FaHome /> Dashboard</Link>
            
            <Link to="/notifications"><FaBell /> Notifications</Link>
            <Link to="/analytics"><FaChartBar /> Analytics</Link>
          </nav>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Board */}
      <main className={styles.boardArea}>
        <header className={styles.boardHeader}>
          <h2>Dashboard</h2>
          <div className={styles.boardActions}>
            
            <FaUserCircle className={styles.icon} />
          </div>
        </header>

        <Button variant="primary" onClick={() => setShowModal(true)} className={styles.createBtn}>
          + Create Task
        </Button>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
           <Modal.Footer>
  <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
  <Button variant="primary" type="submit">
    Save Task
  </Button>
</Modal.Footer>
          </Form>
        </Modal>

        {/* Kanban Board */}
        <div className={styles.board}>
          {["TODO", "IN_PROGRESS", "DONE"].map(status => (
            <div key={status} className={styles.column}>
              <div className={styles.columnHeader}>{status.replace("_", " ")}</div>
              {tasks.filter(t => t.status === status).map(task => {
                const meta = getTaskMeta(task);
                return (
                  <div key={task.id} className={styles.taskCard}>
                    <div className={styles.taskTitle}>{task.title}</div>
                    <div className={styles.metaRow}>
                      {meta.avatar && <span className={styles.avatarSmall}></span>}
                      {meta.color && <span className={styles.metaDot} style={{ background: meta.color }}></span>}
                      <span className={styles.metaLabel}>{meta.label}</span>
                    </div>
                    <div className={styles.cardActions}>
                      {status !== "TODO" && <button onClick={() => updateTaskStatus(task.id, "TODO")}>Todo</button>}
                      {status !== "IN_PROGRESS" && <button onClick={() => updateTaskStatus(task.id, "IN_PROGRESS")}>Progress</button>}
                      {status !== "DONE" && <button onClick={() => updateTaskStatus(task.id, "DONE")}>Done</button>}
                      <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
