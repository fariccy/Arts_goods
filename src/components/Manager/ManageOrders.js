import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ManageOrders.module.css';

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
      const [ordersRes, itemsRes, managersRes] = await Promise.all([
        axios.get('http://localhost:8080/api/orders/all'),
        axios.get('http://localhost:8080/api/items/all'),
        axios.get('http://localhost:8080/api/managers/all'),
      ]);
      setOrders(ordersRes.data);
      setItems(itemsRes.data);
      setManagers(managersRes.data);
    } catch (error) {
      setMessage('Error fetching data.');
      console.error(error);
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
        console.error(error);
      }
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order.id);
    setEditDate(order.date);
    setEditItemId(order.item?.id || '');
    setEditManagerId(order.manager?.id || '');
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}`, {
        date: editDate,
        item: editItemId ? { id: editItemId } : null,
        manager: editManagerId ? { id: editManagerId } : null,
      });
      setMessage('Order updated successfully!');
      setEditingOrder(null);
      fetchData();
    } catch (error) {
      setMessage('Error updating order.');
      console.error(error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.card}>
      <h2>Manage Orders</h2>
      {message && (
        <p className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
          {message}
        </p>
      )}

      <div className={styles.rowHeader}>
        <div className={styles.cell}>ID</div>
        <div className={styles.cell}>Date</div>
        <div className={styles.cell}>Item</div>
        <div className={styles.cell}>Manager</div>
        <div className={styles.cell}>Actions</div>
      </div>

      {orders.map((order) => (
        <div key={order.id} className={styles.row}>
          <div className={styles.cell}>{order.id}</div>
          <div className={styles.cell}>
            {editingOrder === order.id ? (
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className={styles.input}
              />
            ) : (
              order.date
            )}
          </div>
          <div className={styles.cell}>
            {editingOrder === order.id ? (
              <select
                value={editItemId}
                onChange={(e) => setEditItemId(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Item</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.description} (ID: {item.id})
                  </option>
                ))}
              </select>
            ) : order.item ? (
              `${order.item.description} (ID: ${order.item.id})`
            ) : (
              'N/A'
            )}
          </div>
          <div className={styles.cell}>
            {editingOrder === order.id ? (
              <select
                value={editManagerId}
                onChange={(e) => setEditManagerId(e.target.value)}
                className={styles.select}
              >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.username} (ID: {manager.id})
                  </option>
                ))}
              </select>
            ) : order.manager ? (
              `${order.manager.username} (ID: ${order.manager.id})`
            ) : (
              'N/A'
            )}
          </div>
          <div className={styles.cell}>
            {editingOrder === order.id ? (
              <>
                <button
                  className={`${styles.btn} ${styles.saveBtn}`}
                  onClick={() => handleUpdate(order.id)}
                >
                  Save
                </button>
                <button
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={() => setEditingOrder(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.btn} ${styles.editBtn}`}
                  onClick={() => handleEditClick(order)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.btn} ${styles.deleteBtn}`}
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
