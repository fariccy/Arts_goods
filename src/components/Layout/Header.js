import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css'; // Your CSS module

const Header = () => {
  const navigate = useNavigate();
  const [currentUser , setCurrentUser ] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        console.log('User  from localStorage:', user); // Debug log
        setCurrentUser (user);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        setCurrentUser (null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser (null);
    navigate('/login');
  };

  const allowedRoles = ['User ', 'Manager', 'Admin']; // Removed trailing space

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Arts Management
      </Link>
      <nav>
        {currentUser  && allowedRoles.includes(currentUser .role) ? (
          <div className={styles.userContainer}>
            <span className={styles.userIcon}>{currentUser .username.charAt(0).toUpperCase()}</span>
            <button onClick={handleLogout} className={styles.btn}>
              Logout ({currentUser .username})
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Logout</Link>
           
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
