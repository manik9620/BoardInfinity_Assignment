import React, { useContext, useState, useRef } from "react";
import TaskContext from "../context/TaskContext";
import "./TaskCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const TaskCard = ({ task,classname }) => {
  const { updateTask, moveTaskBetweenLists, deleteTask } = useContext(TaskContext);

  const [isEditingForm, setIsEditingForm] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title || "");
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [newDate, setNewDate] = useState(task.date || "");
  const [newPriority, setNewPriority] = useState(task.priority || "Low");
  const [isMoving, setIsMoving] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cardRef = useRef(null);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleEditForm = () => {
    setIsEditingForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setNewTitle(value);
        break;
      case "description":
        setNewDescription(value);
        break;
      case "date":
        setNewDate(value);
        break;
      case "priority":
        setNewPriority(value);
        break;
      default:
        break;
    }
  };

  const handleFormSave = () => {
    if (newTitle.trim() !== "") {
      updateTask(task.id, {
        title: newTitle,
        description: newDescription,
        date: newDate,
        priority: newPriority,
      });
      setIsEditingForm(false);
    }
  };

  const handleFormCancel = () => {
    setIsEditingForm(false);
  };

  const handleMoveTask = (direction) => {
    setIsMoving(true);

    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      cardRef.current.style.transform = `translateX(${direction === "left" ? "-80px" : "80px"})`;
      cardRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      moveTaskBetweenLists(task.id, direction)
        .then(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = "translateX(0)";
            cardRef.current.style.opacity = "1";
          }
          setIsMoving(false);
        })
        .catch((error) => {
          console.error("Error moving task:", error);
          setIsMoving(false);
        });
    }, 300);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const priorityColor = {
    Low: "priority-low",
    Medium: "priority-medium",
    High: "priority-high",
  };

  return (
    <div className={`task-card ${classname}`} ref={cardRef}>
      <div className="priority-deletebtn-div">
        <p className={`priority ${priorityColor[newPriority] || "default"}`}>
          {newPriority}
        </p>
        <div className="position-relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-outline-secondary">
          <i class="bi bi-three-dots-vertical"></i>
          </button>
          {isMenuOpen && (
            <div className="position-absolute end-0 mt-2">
              <div className="btn-group">
                <button onClick={handleOpenPopup} className="btn btn-danger">
                  <i className="bi bi-trash-fill"></i> Delete
                </button>
                <button onClick={handleEditForm} className="btn btn-primary">
                  <i className="bi bi-pencil"></i> Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="title-status-div">
        <h3>{task.title}</h3>
      </div>

      <p className="description">{task.description}</p>

      <hr />
      <p className="date">
        <span>
          <i className="bi bi-calendar4-event"></i>
        </span>
        {task.date}
      </p>

      <div className="move-buttons">
        <button
          className="move-left"
          disabled={isMoving || task.status === "todo"}
          onClick={() => handleMoveTask("left")}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <button
          className="move-right"
          disabled={isMoving || task.status === "completed"}
          onClick={() => handleMoveTask("right")}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>

      {isPopupVisible && (
        <>
          <div className="popup-overlay" />
          <div className="popup">
            <div className="popup-content">
              <h2>Are you sure you want to delete?</h2>
              <div className="popup-buttons">
                <button className="cancel-button" onClick={handleClosePopup}>
                  Cancel
                </button>
                <button className="confirm-button" onClick={handleDeleteTask}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isEditingForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-modal-btn" onClick={handleFormCancel}>
              &times;
            </button>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="title">
                  Title <span>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTitle}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={newDescription}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">
                  Select Date <span>*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newDate}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={newPriority}
                  onChange={handleFormChange}
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
                  onClick={handleFormCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleFormSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
