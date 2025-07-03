import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css'; // CSS Module

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.get(`http://localhost:8080/api/users/username/${username}`);
      const user = response.data;

      if (user && user.password === password) {
        localStorage.setItem('user', JSON.stringify(user));

        switch (user.role) {
          case 'Manager':
            navigate('/manager/dashboard');
            break;
          case 'Customer':
            navigate('/customer/dashboard');
            break;
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          default:
            setMessage('Unknown user role.');
        }
      } else {
        setMessage('Login failed. Invalid username or password.');
      }
    } catch (error) {
      const resMessage =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      setMessage(`Login failed: ${resMessage}`);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className={styles.btn}>Login</button>

        {message && (
          <p className={`${styles.message} ${message.toLowerCase().includes('failed') ? styles.error : styles.success}`}>
            {message}
          </p>
        )}
        <p className={styles.registerPrompt}>
          Don't have an account? <a href="/register" className={styles.registerLink}>Register here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
