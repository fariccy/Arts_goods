import React, { useState } from 'react';
import OrderModal from './OrderModal'; // ✅ Import modal
import './User.css';

const ArtItemCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false); // ✅ Controls modal

  return (
    <div className="art-card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span>{item.price}</span>
      <button onClick={() => setShowModal(true)}>Order</button>

      {showModal && (
        <OrderModal item={item} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ArtItemCard;
