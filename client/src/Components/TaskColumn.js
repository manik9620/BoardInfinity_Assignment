  import React from "react";
  import TaskCard from "./TaskCard";
  import "./TaskColumn.css";

  const TaskColumn = ({ title, tasks, className }) => {
    return (
      <div className={`task-column ${className}`}>
        <p className="task-column-title">{title}</p>
        <div className="task-column-data">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} className={className} />)
          ) : (
            <p className="no-tasks">No tasks available</p>
          )}
        </div>
      </div>
    );
  };

  export default TaskColumn;
