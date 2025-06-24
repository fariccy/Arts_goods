// src/components/Admin/ManageGoods.js
import React from 'react';
import './Admin.css'; // This will contain the styles below

const ManageGoods = () => {
  const goods = [
    { id: 1, title: 'Sunset Art', price: 50000, image: 'https://via.placeholder.com/200x150' },
    { id: 2, title: 'Ocean Waves', price: 70000, image: 'https://via.placeholder.com/200x150' },
    { id: 3, title: 'Mountain Peace', price: 85000, image: 'https://via.placeholder.com/200x150' }
  ];

  const handleEdit = (id) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete item with ID: ${id}`);
  };

  return (
    <div className="manage-goods">
      <h2>Manage Art Goods</h2>
      <div className="goods-grid">
        {goods.map((item) => (
          <div className="goods-card" key={item.id}>
            <div className="goods-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="goods-info">
              <h3>{item.title}</h3>
              <p>Tzs {item.price}</p>
            </div>
            <div className="goods-actions">
              <button className="btn-edit" onClick={() => handleEdit(item.id)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGoods;
