import React, { useState } from 'react';
import './Arts.css'; // Reuse same styles for consistency
import { Link } from 'react-router-dom'; // Add this at the top




const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }

    // Simulated success
    setError('');
    alert(`Registered successfully!\nUsername: ${form.username}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Create Account</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
            />
          </div>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-btn" type="submit">Register</button>
        </form>
        <div className="login-footer">
         <Link to="/">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
