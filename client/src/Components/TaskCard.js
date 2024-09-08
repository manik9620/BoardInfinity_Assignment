import React, { useContext, useState, useRef } from "react";
import TaskContext from "../context/TaskContext";
import "./TaskCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const TaskCard = ({ task, className }) => {
  const { updateTaskStatus, moveTaskBetweenLists, deleteTask } =
    useContext(TaskContext);

  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState(null);

  const cardRef = useRef(null);

  const handleMoveTask = (direction) => {
    setIsMoving(true);
    setMoveDirection(direction);

    if (cardRef.current) {
      cardRef.current.style.transition =
        "transform 0.3s ease, opacity 0.3s ease";
      cardRef.current.style.transform = `translateX(${
        direction === "left" ? "-80px" : "80px"
      })`;
      cardRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      moveTaskBetweenLists(task.id, direction)
        .then(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = "translateX(0)";
            cardRef.current.style.opacity = "1";
            setIsMoving(false);
            setMoveDirection(null);
          }
        })
        .catch((error) => {
          console.error("Error moving task:", error);
          setIsMoving(false);
        });
    }, 300);
  };

  // const handleStatusChange = (e) => {
  //   updateTaskStatus(task.id, e.target.value);
  // };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const priorityColor = {
    Low: "priority-low",
    Medium: "priority-medium",
    High: "priority-high",
  };

  return (
    <div className={`task-card `} ref={cardRef}>

      <div className="priority-deletebtn-div">
        <p className={`priority ${priorityColor[task.priority] || "default"}`}>
          {task.priority}
        </p>
        <button onClick={handleDeleteTask} className="delete-task-btn">
          <i className="bi bi-trash-fill"></i> 
        </button>
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
          <i className="bi bi-arrow-left-circle-fill"></i>
        </button>
        <button
          className="move-right"
          disabled={isMoving || task.status === "completed"}
          onClick={() => handleMoveTask("right")}
        >
          <i className="bi bi-arrow-right-circle-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
