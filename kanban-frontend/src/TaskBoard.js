import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaHome, FaComments, FaBell, FaChartBar, FaSignOutAlt, FaMoon, FaUserCircle,FaSun  } from "react-icons/fa";
import styles from './TaskBoard.module.css';

  export default function TaskBoard({ isDarkMode, setIsDarkMode }){
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO"
  });

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  // Meta info for demo purposes
  const getTaskMeta = (task) => {
    if (task.status === "TODO") return { label: "Todo", avatar: true };
    if (task.status === "IN_PROGRESS") return { label: "In Progress", color: "#ff5f7e" };
    if (task.status === "DONE") return { label: "Done", color: "#34c759" };
    return {};
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (taskToUpdate) {
      fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskToUpdate, status: newStatus })
      })
        .then(res => res.json())
        .then(updatedTask => {
          setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        })
        .catch(err => console.error("Error updating task:", err));
    }
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Delete this task?")) {
      fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE"
      })
        .then(() => {
          setTasks(tasks.filter(t => t.id !== taskId));
        });
    }
  };


  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar}></div>
          <div className={styles.username}>Swetha</div>
        </div>
        <nav className={styles.nav}>
          <a className={styles.active}><FaHome /> Dashboard</a>
          <a><FaComments /> Team Chat</a>
          <a><FaBell /> Notifications</a>
          <a><FaChartBar /> Analytics</a>
          <a><FaSignOutAlt /> Logout</a>
        </nav>
      </aside>

      {/* Main Board */}
       <main className={styles.boardArea}>
      <header className={styles.boardHeader}>
        <h2>Dashboard</h2>
        <div className={styles.boardActions}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={styles.icon}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <FaUserCircle className={styles.icon} />
        </div>
      </header>
        {/* Create Task Button */}
        <Button variant="primary" onClick={() => setShowModal(true)} className={styles.createBtn}>
          + Create Task
        </Button>

        {/* Create Task Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
                  {/* <option value="DONE">Done</option> */}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              fetch("http://localhost:8080/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
              })
                .then(res => res.json())
                .then(task => {
                  setTasks([...tasks, task]);
                  setNewTask({ title: "", description: "", status: "TODO" });
                  setShowModal(false);
                })
                .catch(err => console.error("Error creating task:", err));
            }}>
              Save Task
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Kanban Board */}
        <div className={styles.board}>
          {/* To Do */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>To Do</div>
            {tasks.filter(t => t.status === "TODO").map(task => {
              const meta = getTaskMeta(task);
              return (
                <div key={task.id} className={styles.taskCard}>
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.metaRow}>
                    {meta.avatar && <span className={styles.avatarSmall}></span>}
                    <span className={styles.metaLabel}>{meta.label}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <button onClick={() => updateTaskStatus(task.id, "IN_PROGRESS")}>Start</button>
                    <button onClick={() => updateTaskStatus(task.id, "DONE")}>Done</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* In Progress */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>In Progress</div>
            {tasks.filter(t => t.status === "IN_PROGRESS").map(task => {
              const meta = getTaskMeta(task);
              return (
                <div key={task.id} className={styles.taskCard}>
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaDot} style={{ background: meta.color }}></span>
                    <span className={styles.metaLabel}>{meta.label}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <button onClick={() => updateTaskStatus(task.id, "TODO")}>Redo</button>
                    <button onClick={() => updateTaskStatus(task.id, "DONE")}>Done</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Done */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>Done</div>
            {tasks.filter(t => t.status === "DONE").map(task => {
              const meta = getTaskMeta(task);
              return (
                <div key={task.id} className={styles.taskCard}>
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaDot} style={{ background: meta.color }}></span>
                    <span className={styles.metaLabel}>{meta.label}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <button onClick={() => updateTaskStatus(task.id, "TODO")}>Redo</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
