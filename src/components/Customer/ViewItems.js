import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ViewItems.module.css'; // Import CSS module

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card">
      <h2>Available Items</h2>
      {message && <p className={`message ${message.includes('Error') ? 'error' : ''}`}>{message}</p>}
      <div className={styles.itemList}>
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              {item.image && (
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.description}
                />
              )}
              <div className={styles.itemDetails}>
                <h3>{item.description}</h3>
                <p>Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                <p>Managed by: {item.manager ? `Manager ID ${item.manager.id}` : 'N/A'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewItems;
