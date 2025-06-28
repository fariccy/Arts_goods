import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import UploadItem from './UploadItem';
import ManageItems from './ManageItems';
import ManageOrders from './ManageOrders';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ManagerDashboard.module.css'; // Import CSS module

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      if (user.role !== 'Manager') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  if (currentUser.role !== 'Manager') {
    return <div className="message error">Access Denied. You are not authorized to view this page.</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="Manager" />
      <div className={styles.contentArea}>
        <h1>Welcome, Manager {currentUser.username}!</h1>
        <Routes>
          <Route path="upload-item" element={<UploadItem />} />
          <Route path="manage-items" element={<ManageItems />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="/" element={<p>Select an option from the sidebar.</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default ManagerDashboard;
