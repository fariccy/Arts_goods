// src/components/admin/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/upload" activeClassName="active" >Upload Art</NavLink> 
          </li>
          <li>
            <NavLink to="/admin/manage" activeClassName="active">Manage Goods</NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders">Manage Orders</NavLink>
          </li>
            <li>
            <NavLink to="/" activeClassName="active">Logout</NavLink>
          </li> 
        </ul>
       
      </nav>
    </div>
  );
};

export default Sidebar;
