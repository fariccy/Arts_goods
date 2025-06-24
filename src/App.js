// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './Pages/AdminDashboard';
import AdminLayout from './components/Admin/AdminLayout';
import ManageGoods from './components/Admin/ManageGoods';
import UploadArt from './components/Admin/UploadArt';
import UserDashboard from './components/User/UserDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/upload" element={<UploadArt />} />
        <Route path="/manage" element={<ManageGoods />} />
      </Routes>
    </Router>
  );
}
export default App;

