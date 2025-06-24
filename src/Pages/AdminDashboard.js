// src/pages/AdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import UploadArt from '../components/Admin/UploadArt';
import ManageGoods from '../components/Admin/ManageGoods';
import ManageOrders from '../components/Admin/ManageOrders';


const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="upload" element={<UploadArt />} />
        <Route path="manage" element={<ManageGoods />} />
        <Route path="orders" element={<ManageOrders />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
