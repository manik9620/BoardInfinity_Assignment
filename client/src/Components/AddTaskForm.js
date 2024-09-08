import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import "./AddTaskForm.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddTaskForm = () => {
  const { addTask } = useContext(TaskContext);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    status: "todo",
    priority: "Low",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...task, id: Date.now() });
    setTask({
      title: "",
      description: "",
      date: "",
      status: "todo",
      priority: "Low",
    });
    setIsFormOpen(false);
  };

  // Toggle modal visibility
  const handleModalToggle = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="main-div">
      <p className="main-div-heading">Desktop & Mobile Application</p>
      <button className="open-modal-btn" onClick={handleModalToggle}>
        Create Task
      </button>

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal-btn" onClick={handleModalToggle}>
              ×
            </button>
            <form onSubmit={handleSubmit} className="add-task-form">
              <p>
                <span>
                  <i class="bi bi-plus-circle-fill"></i>
                </span>
                Create New Task
              </p>

              <div className="form-group">
                <label htmlFor="title">
                  Title <span>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Select here"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Add here"
                  rows={7}
                  cols={50}
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">
                  Select Date <span>*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={task.date}
                  onChange={(e) => setTask({ ...task, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={task.status}
                  onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={task.priority}
                  onChange={(e) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleModalToggle}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
