import React, { useState } from 'react';
import './Arts.css';
import { Link, useNavigate } from 'react-router-dom'; //  added useNavigate

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // create navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  Simple role-based check
    if (form.username === 'admin' && form.password === '123') {
      setError('');
      localStorage.setItem('role', 'admin'); //  Store role
      navigate('/admin'); // Redirect to admin page
    } else {
      setError('Invalid username or password');
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign In</h2>
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
              autoComplete="username"
              placeholder="Enter your username"
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
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-btn" type="submit">Login</button>
        </form>
        <div className="login-footer">
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
