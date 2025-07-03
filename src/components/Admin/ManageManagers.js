import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Common/LoadingSpinner';
import styles from './ManageManagers.module.css';

const ManageManagers = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingManager, setEditingManager] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editExpertise, setEditExpertise] = useState('');

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/managers/all');
      setManagers(response.data);
    } catch (error) {
      setMessage('Error fetching managers.');
      console.error('Error fetching managers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this manager?')) {
      try {
        await axios.delete(`http://localhost:8080/api/managers/${id}`);
        setMessage('Manager deleted successfully!');
        fetchManagers();
      } catch (error) {
        setMessage('Error deleting manager.');
        console.error('Error deleting manager:', error);
      }
    }
  };

  const handleEditClick = (manager) => {
    setEditingManager(manager.id);
    setEditUsername(manager.username);
    setEditPassword(''); // Don't prefill password for security
    setEditExpertise(manager.expertise);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedManager = {
        username: editUsername,
        password: editPassword,
        expertise: editExpertise,
        role: 'Manager',
      };
      await axios.put(`http://localhost:8080/api/managers/${id}`, updatedManager);
      setMessage('Manager updated successfully!');
      setEditingManager(null);
      fetchManagers();
    } catch (error) {
      setMessage('Error updating manager.');
      console.error('Error updating manager:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.card}>
      <h2>Manage Managers</h2>
      {message && (
        <p className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
          {message}
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Expertise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id}>
              <td>{manager.id}</td>
              <td>
                {editingManager === manager.id ? (
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  manager.username
                )}
              </td>
              <td>
                {editingManager === manager.id ? (
                  <input
                    type="text"
                    value={editExpertise}
                    onChange={(e) => setEditExpertise(e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  manager.expertise
                )}
              </td>
              <td>
                {editingManager === manager.id ? (
                  <>
                    <button
                      className={`${styles.btn} ${styles['edit-btn']}`}
                      onClick={() => handleUpdate(manager.id)}
                    >
                      Save
                    </button>
                    <button
                      className={`${styles.btn} ${styles['cancel-btn']}`}
                      onClick={() => setEditingManager(null)}
                      style={{ marginLeft: '8px' }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`${styles.btn} ${styles['edit-btn']}`}
                      onClick={() => handleEditClick(manager)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.btn} ${styles['delete-btn']}`}
                      onClick={() => handleDelete(manager.id)}
                      style={{ marginLeft: '8px' }}
                    >
                      Delete
                    </button>
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

export default ManageManagers;
