  import React from "react";
  import TaskCard from "./TaskCard";
  import "./TaskColumn.css";

  const TaskColumn = ({ title, tasks, classname }) => {
    const back = title==="TODO"?`#8a30e5`:title==="IN PROGRESS"?`#ffc04f`:`#06c270`;
    const front = title==="TODO"?`white`:title==="IN PROGRESS"?`black`:`white`;
    return (
      <div className={`task-column`}>
        <p className={`task-column-title`} style={{margin:0, background:back, color:front,padding:"10px",borderRadius: "15px 15px 0 0"}}>{title}</p>
        <div className="task-column-data">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} classname={`${classname}`} />)
          ) : (
            <p className="no-tasks">No tasks available</p>
          )}
        </div>
      </div>
    );
  };

  export default TaskColumn;
