import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';

const MakeOrder = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState('');
  const [managers, setManagers] = useState([]); // To select a manager for the order

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.role === 'Customer') {
      setCurrentCustomerId(currentUser.id);
    } else {
      setMessage('You must be logged in as a Customer to make an order.');
    }
    fetchItemsAndManagers();
  }, []);

  const fetchItemsAndManagers = async () => {
    setLoading(true);
    try {
      const [itemsResponse, managersResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/items/all'),
        axios.get('http://localhost:8080/api/managers/all'),
      ]);
      setItems(itemsResponse.data);
      setManagers(managersResponse.data);
    } catch (error) {
      setMessage('Error fetching items or managers.');
      console.error('Error fetching items or managers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!currentCustomerId) {
      setMessage('Customer ID not found. Please log in as a customer.');
      return;
    }
    if (!selectedItemId) {
      setMessage('Please select an item.');
      return;
    }
    if (!orderDate) {
      setMessage('Please select an order date.');
      return;
    }

    setLoading(true);
    try {
      // Find the manager associated with the selected item
      const selectedItem = items.find(item => item.id === parseInt(selectedItemId));
      if (!selectedItem || !selectedItem.manager) {
        setMessage('Selected item does not have an associated manager.');
        setLoading(false);
        return;
      }
      const managerId = selectedItem.manager.id;

      await axios.post('http://localhost:8080/api/orders/add', null, {
        params: {
          itemId: selectedItemId,
          managerId: managerId, // Use the manager ID from the item
          date: orderDate,
        },
      });
      setMessage('Order placed successfully!');
      setSelectedItemId('');
      setOrderDate('');
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(`Error placing order: ${resMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card">
      <h2>Make a New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item">Select Item:</label>
          <select
            id="item"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            required
          >
            <option value="">-- Select an Item --</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description} - ${item.price ? item.price.toFixed(2) : 'N/A'}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="orderDate">Order Date:</label>
          <input
            type="date"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Place Order'}
        </button>
        {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default MakeOrder;
