// src/components/admin/UploadArt.js
import React, { useState } from 'react';
import './Admin.css';

const UploadArt = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', image: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Art uploaded!');
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Upload New Art</h2>
      <input type="text" name="title" placeholder="Art Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit" className="upload-btn">Upload</button>
    </form>
  );
};

export default UploadArt;
