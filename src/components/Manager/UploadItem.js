import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './UploadItem.module.css'; // Import CSS module (even if empty for now)

const UploadItem = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [managerId, setManagerId] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.role === 'Manager') {
      setManagerId(currentUser.id);
    } else {
      setMessage('You must be logged in as a Manager to upload items.');
    }
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!managerId) {
      setMessage('Manager ID not found. Please log in as a manager.');
      return;
    }
    if (!image) {
      setMessage('Please select an image file.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('price', parseFloat(price));
      formData.append('managerId', managerId);
      formData.append('image', image);

      await axios.post('http://localhost:8080/api/items/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Item uploaded successfully!');
      setDescription('');
      setPrice('');
      setImage(null);
      document.getElementById('image-upload').value = '';
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(`Error uploading item: ${resMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Upload Item'}
        </button>
        {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default UploadItem;
