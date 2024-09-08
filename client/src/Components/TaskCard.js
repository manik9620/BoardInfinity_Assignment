import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const { updateTaskStatus } = useContext(TaskContext);

  const handleStatusChange = (e) => {
    updateTaskStatus(task.id, e.target.value);
  };

  const priorityColor = {
    Low: "priority-low", 
    Medium: "priority-medium",
    High: "priority-high",
  };

  return (
    <div className="task-card">
      <p
        className={`priority ${priorityColor[task.priority] || "default"}`} 
      >
        {task.priority}
      </p>

      <div className="title-status-div">
        <h3>{task.title}</h3>
        <div className="custom-select-wrapper">
          <label>
            <select
              className="custom-select"
              value={task.status}
              onChange={handleStatusChange}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>
      </div>

      <p className="description">{task.description}</p>

      <hr />
      <p className="date"><span><i class="bi bi-calendar4-event"></i></span>{task.date}</p>
    </div>
  );
};

export default TaskCard;