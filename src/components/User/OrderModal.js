import React, { useState } from 'react';
import './User.css';

const OrderModal = ({ item, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Mock order submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      alert(`✅ Mock order placed for "${item.title}" by ${form.name} (${form.email}), Quantity: ${form.quantity}`);
      onClose();
    }, 1000); // simulate 1 second delay
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Order: {item.title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Order</button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderModal;
