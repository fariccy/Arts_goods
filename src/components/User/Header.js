import React from 'react';
import './User.css';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="user-header">
      <h1>Arts Market</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
