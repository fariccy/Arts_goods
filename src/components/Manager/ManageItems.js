import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ManageItems.module.css';

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/items/all');
      setItems(response.data);
    } catch (error) {
      setMessage('Error fetching items.');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:8080/api/items/${id}`);
        setMessage('Item deleted successfully!');
        fetchItems();
      } catch (error) {
        setMessage('Error deleting item.');
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item.id);
    setEditDescription(item.description);
    setEditPrice(item.price);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/items/${id}`, {
        description: editDescription,
        price: parseFloat(editPrice)
      });
      setMessage('Item updated successfully!');
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      setMessage('Error updating item.');
      console.error('Error updating item:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.card}>
      <h2>Manage Items</h2>
      {message && (
        <p className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
          {message}
        </p>
      )}

      <div className={`${styles.row} ${styles.headerRow}`}>
        <div className={styles.cellId}>ID</div>
        <div className={styles.cellDescription}>Description</div>
        <div className={styles.cellPrice}>Price</div>
        <div className={styles.cellManager}>Manager ID</div>
        <div className={styles.cellActions}>Actions</div>
      </div>

      {items.map((item) => (
        <div key={item.id} className={styles.row}>
          <div className={styles.cellId}>{item.id}</div>

          <div className={styles.cellDescription}>
            {editingItem === item.id ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className={styles.textarea}
              />
            ) : (
              item.description
            )}
          </div>

          <div className={styles.cellPrice}>
            {editingItem === item.id ? (
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                step="0.01"
                className={styles.inputPrice}
              />
            ) : (
              `$${item.price ? item.price.toFixed(2) : 'N/A'}`
            )}
          </div>

          <div className={styles.cellManager}>{item.manager ? item.manager.id : 'N/A'}</div>

          <div className={styles.cellActions}>
            {editingItem === item.id ? (
              <>
                <button
                  className={`${styles.btn} ${styles.btnSuccess}`}
                  onClick={() => handleUpdate(item.id)}
                >
                  Save
                </button>
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.btn}`}
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => handleDelete(item.id)}
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

export default ManageItems;
