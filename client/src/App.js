// App.js
import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskBoard from './Components/TaskBoard';
import AddTaskForm from './Components/AddTaskForm';
// import './styles.css';

const App = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Desktop & Mobile Application</h1>
        <AddTaskForm />
        <TaskBoard />
      </div>
    </TaskProvider>
  );
};

export default App;
