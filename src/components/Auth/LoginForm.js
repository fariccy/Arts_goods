import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css'; // Import CSS module

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
        if (user.role === 'Manager') {
          navigate('/manager/dashboard');
        } else if (user.role === 'Customer') {
          navigate('/customer/dashboard');
        } else if (user.role === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          setMessage('Unknown user role.');
        }
      } else {
        setMessage('Login failed. Invalid username or password.');
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(`Login failed: ${resMessage}`);
    }
  };

  return (
    <div className={`card ${styles.loginFormContainer}`}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        {message && <p className={`message ${message.includes('failed') ? 'error' : ''}`}>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
