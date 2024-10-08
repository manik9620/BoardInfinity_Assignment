// TaskBoard.js
import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TaskColumn from './TaskColumn';
import './TaskBoard.css';

const TaskBoard = () => {
  const { tasks } = useContext(TaskContext);

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="task-board">
      <TaskColumn title="TODO" tasks={getTasksByStatus("todo")} classname = "todo"  />
      <TaskColumn title="IN PROGRESS" tasks={getTasksByStatus("in-progress")} classname = "in-progress" />
      <TaskColumn title="COMPLETED" tasks={getTasksByStatus("completed")} classname = "completed" />
    </div>
  );
};

export default TaskBoard;
