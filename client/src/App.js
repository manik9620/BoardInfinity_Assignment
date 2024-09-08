// App.js
import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskBoard from './Components/TaskBoard';
import AddTaskForm from './Components/AddTaskForm';
import Navbar from './Components/Navbar';
import './App.css'

const App = () => {
  return (
    <TaskProvider>
        <Navbar/>
      <div className="app-container">
        <AddTaskForm />
        <TaskBoard />
      </div>
    </TaskProvider>
  );
};

export default App;
