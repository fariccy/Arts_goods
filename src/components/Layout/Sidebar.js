import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Import CSS module

const Sidebar = ({ role }) => {
  return (
    <div className={styles.sidebar}>
      <h3>{role} Dashboard</h3>
      <ul>
        {role === 'Manager' && (
          <>
            <li><Link to="/manager/upload-item" className={styles.sidebarLink}>Upload Item</Link></li>
            <li><Link to="/manager/manage-items" className={styles.sidebarLink}>Manage Items</Link></li>
            <li><Link to="/manager/manage-orders" className={styles.sidebarLink}>Manage Orders</Link></li>
          </>
        )}
        {role === 'Customer' && (
          <>
            <li><Link to="/customer/view-items" className={styles.sidebarLink}>View Items</Link></li>
            <li><Link to="/customer/make-order" className={styles.sidebarLink}>Make Order</Link></li>
          </>
        )}
        {role === 'Admin' && (
          <>
            <li><Link to="/admin/add-manager" className={styles.sidebarLink}>Add Manager</Link></li>
            <li><Link to="/admin/manage-managers" className={styles.sidebarLink}>Manage Managers</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
