import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ManageItems.module.css'; // Import CSS module (even if empty for now)

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
      await axios.put(`http://localhost:8080/api/items/${id}`, { description: editDescription, price: parseFloat(editPrice) });
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
    <div className="card">
      <h2>Manage Items</h2>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Price</th>
            <th>Manager ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingItem === item.id ? (
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  item.description
                )}
              </td>
              <td>
                {editingItem === item.id ? (
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    step="0.01"
                  />
                ) : (
                  `$${item.price ? item.price.toFixed(2) : 'N/A'}`
                )}
              </td>
              <td>{item.manager ? item.manager.id : 'N/A'}</td>
              <td>
                {editingItem === item.id ? (
                  <>
                    <button className="btn" onClick={() => handleUpdate(item.id)}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setEditingItem(null)} style={{ marginLeft: '5px' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn" onClick={() => handleEditClick(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{ marginLeft: '5px' }}>Delete</button>
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

export default ManageItems;
