import React, { useState } from 'react';
import styles from './styles.module.css';

// Separate component for displaying individual tasks
// Props: task (task details), users (list of users), onRemove (function to remove task)
const TaskItem = ({ task, users, onRemove }) => {
  // Find the user assigned to this task
  // Converting task.userId to Number because select values are strings
  const assignedUser = users.find(u => u.id === Number(task.userId));
  
  return (
    <div className={styles.taskItem}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className={styles.taskMeta}>
        <span>Status: {task.status}&nbsp;&nbsp;&nbsp;</span>
        <span>Assigned to: {assignedUser ? assignedUser.username : 'Unassigned'}</span>
      </div>
      {/* Remove task button */}
      <button 
        onClick={() => onRemove(task.id)} 
        className={styles.deleteButton}
      >
        Remove Task
      </button>
    </div>
  );
};

// Main TaskManagement component
// Props: users (list of users), tasks (list of tasks), setTasks (function to update tasks)
const TaskManagement = ({ users, tasks, setTasks }) => {
  // State for filtering tasks
  const [filterStatus, setFilterStatus] = useState('all');
  
  // State for error messages
  const [error, setError] = useState('');
  
  // State for new task form
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: '',
    userId: ''
  });

  // Available status options for tasks
  const statusOptions = ['Pending', 'In Progress', 'Completed'];

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter(task => 
    filterStatus === 'all' ? true : task.status === filterStatus
  );

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle new task submission
  const handleTaskSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Validate form fields
    if (!newTask.title || !newTask.description || !newTask.status ||!newTask.userId) {
      setError('Please fill in all task fields');
      return;
    }
    
    // Create new task with unique ID and proper userId type
    const taskWithNumericId = {
      ...newTask,
      id: Date.now(),
      userId: Number(newTask.userId)  // Convert string ID to number
    };
    
    // Add new task to tasks array
    setTasks([...tasks, taskWithNumericId]);
    
    // Reset form fields
    setNewTask({
      title: '',
      description: '',
      status: 'Pending',
      userId: ''
    });
    
    // Clear any error messages
    setError('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management</h1>
      
      {/* Display error message if it exists */}
      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {/* Task Creation Form */}
      <div className={styles.card}>
        <form onSubmit={handleTaskSubmit} className={styles.form}>
          {/* Task Title Input */}
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            className={styles.input}
          />
          
          {/* Task Description Input */}
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            className={styles.input}
          />
          
          {/* Status Selection Dropdown */}
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            className={styles.select}
          ><option value="">Select Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          {/* User Assignment Dropdown */}
          <select
            value={newTask.userId}
            onChange={(e) => setNewTask({...newTask, userId: e.target.value})}
            className={styles.select}
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
          <br />
          <button type="submit" className={styles.button}>Add Task</button>
        </form>
      </div>

      {/* Task List Section */}
      <div className={styles.card}>
        <h2>Task List</h2>
        
        {/* Status Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Tasks</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        {/* Task List */}
        <div className={styles.taskList}>
          {filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              users={users}
              onRemove={removeTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;