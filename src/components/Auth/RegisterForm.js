import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [expertise, setExpertise] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Set role to 'Customer' by default
  const role = 'Customer';

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username.trim() || !password.trim()) {
      setMessage('Username and password cannot be empty.');
      return;
    }

    if (username.trim().length < 3 || password.length < 3) {
      setMessage('Username must be at least 3 characters and password at least 6.');
      return;
    }

    setLoading(true);
    try {
      let userData = { username, password, role };
      let apiUrl = 'http://localhost:8080/api/users/add';

      // Add address for Customer role
      userData = { ...userData, address };

      await axios.post(apiUrl, userData);
      setMessage('Registration successful! Please log in.');

      // Reset form fields
      setUsername('');
      setPassword('');
      setAddress('');
      setExpertise('');

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const resMessage =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      setMessage(`Registration failed: ${resMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.card} ${styles.registerFormContainer}`}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Removed role selection to enforce default role as Customer */}
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {message && (
          <p className={`${styles.message} ${message.includes('successful') ? styles.success : styles.error}`}>
            {message}
          </p>
        )}
        <p className={styles.registerPrompt}>
          Already have an account? <a href="/login" className={styles.registerLink}>Login here</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
