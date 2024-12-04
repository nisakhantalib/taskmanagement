import React, { useState } from 'react';
import styles from './styles.module.css';

function UserManagement({users, setUsers}) {//receive props from parent component
    // State for managing the form input values
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        email: ''
    });
     // State for managing error messages
    const [error, setError] = useState('');


      // Function to remove user
    const removeUser = (userId) => {  
        setUsers(users.filter(user => user.id !== userId));};




   // Function to handle form submission
   const handleUserSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Form validation
    if (!newUser.username || !newUser.password || !newUser.email) {
      setError('Please fill in all user fields');
      return;
    }
    
    // Create new user object with unique ID
    const newUserWithId = {
      ...newUser,  // Spread operator to copy all form values
      id: Date.now() // Using timestamp as a simple unique ID
    };
    
    // Add new user to users array
    setUsers([...users, newUserWithId]);
    
    // Reset form fields
    setNewUser({ username: '', email: '', password: '' });
    
    // Clear any error messages
    setError('');


    
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      
    {/* Show error message if it exists  */}
      {error && (<div className={styles.error}>{error}</div>)}

      <div className={styles.card}>
        <form onSubmit={handleUserSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            className={styles.input}
          />
          <br/>
          <button type="submit" className={styles.button}>Add User</button>
        </form>

        <div className={styles.listContainer}>
          <h3>User List</h3>
          <div className={styles.list}>
            {users.map(user => (
              <div key={user.id} className={styles.listItem}>
                {user.username}  {user.email}
                <button onClick={() => removeUser(user.id)} >Remove User</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;