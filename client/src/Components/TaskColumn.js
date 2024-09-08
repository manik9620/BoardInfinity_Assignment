// TaskColumn.js
import React from "react";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

const TaskColumn = ({ title, tasks, className }) => {
  const contentHeight = tasks.length > 0 ? 'auto' : 0; 
  return (
    <div className={`task-column ${className}`} style={{ height: contentHeight }}>
      <p className="task-column-title">{title}</p>
      <div className="task-column-data">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;