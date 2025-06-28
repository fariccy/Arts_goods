import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css'; // Import CSS module

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [address, setAddress] = useState('');
  const [expertise, setExpertise] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      let userData = { username, password, role };
      let apiUrl = 'http://localhost:8080/api/users/add';

      if (role === 'Customer') {
        userData = { ...userData, address };
        apiUrl = 'http://localhost:8080/api/customers/add';
      } else if (role === 'Manager') {
        userData = { ...userData, expertise };
        apiUrl = 'http://localhost:8080/api/managers/add';
      }

      await axios.post(apiUrl, userData);
      setMessage('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(`Registration failed: ${resMessage}`);
    }
  };

  return (
    <div className={`card ${styles.registerFormContainer}`}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Customer">Customer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {role === 'Customer' && (
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        )}
        {role === 'Manager' && (
          <div className="form-group">
            <label htmlFor="expertise">Expertise:</label>
            <input
              type="text"
              id="expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn">Register</button>
        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
