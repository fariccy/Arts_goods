import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ManageOrders.module.css'; // Import CSS module (even if empty for now)

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [editManagerId, setEditManagerId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersResponse, itemsResponse, managersResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/orders/all'),
        axios.get('http://localhost:8080/api/items/all'),
        axios.get('http://localhost:8080/api/managers/all'),
      ]);
      setOrders(ordersResponse.data);
      setItems(itemsResponse.data);
      setManagers(managersResponse.data);
    } catch (error) {
      setMessage('Error fetching data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/${id}`);
        setMessage('Order deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Error deleting order.');
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order.id);
    setEditDate(order.date);
    setEditItemId(order.item ? order.item.id : '');
    setEditManagerId(order.manager ? order.manager.id : '');
  };

  const handleUpdate = async (id) => {
    try {
      const updatedOrder = {
        date: editDate,
        item: editItemId ? { id: editItemId } : null,
        manager: editManagerId ? { id: editManagerId } : null,
      };
      await axios.put(`http://localhost:8080/api/orders/${id}`, updatedOrder);
      setMessage('Order updated successfully!');
      setEditingOrder(null);
      fetchData();
    } catch (error) {
      setMessage('Error updating order.');
      console.error('Error updating order:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card">
      <h2>Manage Orders</h2>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Item</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {editingOrder === order.id ? (
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                ) : (
                  order.date
                )}
              </td>
              <td>
                {editingOrder === order.id ? (
                  <select
                    value={editItemId}
                    onChange={(e) => setEditItemId(e.target.value)}
                  >
                    <option value="">Select Item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.description} (ID: {item.id})
                      </option>
                    ))}
                  </select>
                ) : (
                  order.item ? `${order.item.description} (ID: ${order.item.id})` : 'N/A'
                )}
              </td>
              <td>
                {editingOrder === order.id ? (
                  <select
                    value={editManagerId}
                    onChange={(e) => setEditManagerId(e.target.value)}
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.username} (ID: {manager.id})
                      </option>
                    ))}
                  </select>
                ) : (
                  order.manager ? `${order.manager.username} (ID: ${order.manager.id})` : 'N/A'
                )}
              </td>
              <td>
                {editingOrder === order.id ? (
                  <>
                    <button className="btn" onClick={() => handleUpdate(order.id)}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setEditingOrder(null)} style={{ marginLeft: '5px' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn" onClick={() => handleEditClick(order)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(order.id)} style={{ marginLeft: '5px' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
