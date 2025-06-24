import React, { useEffect, useState } from 'react';
import Header from './Header';
import ArtItemCard from './ArtItemCard';
import './User.css';

const UserDashboard = () => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    // Fetch from API/localStorage (mocked here)
    const data = [
      { id: 1, title: "Wood Sculpture", image: "/images/sculpture.jpg", description: "Hand carved.", price: "45,000 TZS" },
      { id: 2, title: "Zanzibar Painting", image: "/images/painting.jpg", description: "Original canvas.", price: "80,000 TZS" }
    ];
    setGoods(data);
  }, []);

  return (
    <div className="user-dashboard">
      <Header />
      <h2 className="dashboard-title">Available Art Goods</h2>
      <div className="art-grid">
        {goods.map(item => (
          <ArtItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
