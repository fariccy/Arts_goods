import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import ViewItems from './ViewItems';
import MakeOrder from './MakeOrder';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './CustomerDashboard.module.css'; // Import CSS module

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      if (user.role !== 'Customer') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  if (currentUser.role !== 'Customer') {
    return <div className="message error">Access Denied. You are not authorized to view this page.</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="Customer" />
      <div className={styles.contentArea}>
        <h1>Welcome, Customer {currentUser.username}!</h1>
        <Routes>
          <Route path="view-items" element={<ViewItems />} />
          <Route path="make-order" element={<MakeOrder />} />
          <Route path="/" element={<p>Select an option from the sidebar.</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboard;
