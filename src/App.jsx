// Import React and required hooks
import React, { useState } from 'react';
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import our page components
import UserManagement from './components/UserManagement';
import TaskManagement from './components/TaskManagement';

// Import styles
import styles from './components/styles.module.css';

function App() {
  // Lift state up to App level so it can be shared between components
  const [users, setUsers] = useState([]); // Store all users
  const [tasks, setTasks] = useState([]); // Store all tasks

  return (
    // Router component wraps our entire app
    <Router>
      <div style={{ width: '100%', minHeight: '100vh' }}>
        {/* Navigation bar */}
        <nav className={styles.nav}>
          {/* Link components create clickable navigation links */}
          <Link to="/" className={styles.navLink}>Users</Link>
          <Link to="/tasks" className={styles.navLink}>Tasks</Link>
        </nav>

        {/* Routes define which component to show at which URL */}
        <Routes>
          {/* Route for User Management page */}
          <Route path="/" element={
            <UserManagement 
              users={users} //pass users state
              setUsers={setUsers} //pass setUsers function
            />
          } />
          
          {/* Route for Task Management page */}
          <Route path="/tasks" element={
            <TaskManagement 
              users={users} 
              tasks={tasks} 
              setTasks={setTasks} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;