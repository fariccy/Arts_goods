import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import AddManager from './AddManager';
import ManageManagers from './ManageManagers';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './AdminDashboard.module.css'; // Import CSS module

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      if (user.role !== 'Admin') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  if (currentUser.role !== 'Admin') {
    return <div className="message error">Access Denied. You are not authorized to view this page.</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="Admin" />
      <div className={styles.contentArea}>
        <h1>Welcome, Admin {currentUser.username}!</h1>
        <Routes>
          <Route path="add-manager" element={<AddManager />} />
          <Route path="manage-managers" element={<ManageManagers />} />
          <Route path="/" element={<p>Select an option from the sidebar.</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
