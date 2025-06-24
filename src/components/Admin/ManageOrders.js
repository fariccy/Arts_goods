// src/components/Admin/ManageOrders.js
import React, { useState } from 'react';
import './Admin.css'; // Ensure styling is added in Admin.css

const ManageOrders = () => {
  // ✅ Mocked order data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'Amina',
      email: 'amina@example.com',
      item: 'Wood Sculpture',
      quantity: 2,
      status: 'Pending',
    },
    {
      id: 2,
      customer: 'Juma',
      email: 'juma@example.com',
      item: 'Zanzibar Painting',
      quantity: 1,
      status: 'Pending',
    }
  ]);

  // ✅ Function to update order status
  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  return (
    <div className="admin-form">
      <h2>Manage Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Item:</strong> {order.item}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>

          <div className="order-buttons">
            <button onClick={() => updateStatus(order.id, 'Accepted')} className="btn-accept">Accept</button>
            <button onClick={() => updateStatus(order.id, 'Rejected')} className="btn-reject">Reject</button>
            <button onClick={() => updateStatus(order.id, 'Pending')} className="btn-pending">Pending</button>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
