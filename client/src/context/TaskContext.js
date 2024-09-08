import { createContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateTaskPriority = (taskId, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
  };

  // New function for moving tasks between lists
  const moveTaskBetweenLists = async (taskId, dir) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          // Determine the new status based on dir and current status
          let newStatus;
          switch (task.status) {
            case "todo":
              newStatus = dir === "right" ? "in-progress" : "todo";
              break;
            case "in-progress":
              newStatus = dir === "right" ? "completed" : "todo";
              break;
            case "completed":
              newStatus = dir === "left" ? "in-progress" : "completed";
              break;
            default:
              return task;
          }
          // Update the task's status
          return { ...task, status: newStatus };
        }
        return task;
      });
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTaskStatus,
        updateTaskPriority,
        moveTaskBetweenLists,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;