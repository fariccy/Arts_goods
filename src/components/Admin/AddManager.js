import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './AddManager.module.css'; // Corrected import for CSS module

const AddManager = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [expertise, setExpertise] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const managerData = {
        username,
        password,
        role: 'Manager', // Fixed role for adding a manager
        expertise,
      };
      await axios.post('http://localhost:8080/api/managers/add', managerData);
      setMessage('Manager added successfully!');
      setUsername('');
      setPassword('');
      setExpertise('');
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(`Error adding manager: ${resMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addManagerWrapper}>
      <div className={styles.card}>
        <h2>Add New Manager</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="expertise">Expertise:</label>
            <input
              type="text"
              id="expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Add Manager'}
          </button>
          {message && (
            <p className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddManager;
