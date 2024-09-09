import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksRef = collection(db, "tasks");

    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (newTask) => {
    try {
      await addDoc(collection(db, "tasks"), newTask);
      console.log("Task added successfully.");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updatedFields) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, updatedFields);
      console.log("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const moveTaskBetweenLists = async (taskId, direction) => {
    const task = tasks.find((task) => task.id === taskId);

    if (task) {
      let newStatus;

      switch (task.status) {
        case "todo":
          newStatus = direction === "right" ? "in-progress" : "todo";
          break;
        case "in-progress":
          newStatus = direction === "right" ? "completed" : "todo";
          break;
        case "completed":
          newStatus = direction === "left" ? "in-progress" : "completed";
          break;
        default:
          console.error("Invalid status:", task.status);
          return;
      }

      if (task.status !== newStatus) {
        try {
          const taskRef = doc(db, "tasks", taskId);
          await updateDoc(taskRef, { status: newStatus });
          console.log(`Task ${taskId} moved to ${newStatus}`);
        } catch (error) {
          console.error("Error moving task:", error);
        }
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
      console.log(`Task ${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        moveTaskBetweenLists,
        updateTask, // Provide the new updateTask function
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
