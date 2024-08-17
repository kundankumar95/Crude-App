// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const addItem = () => {
    axios.post('/api/items', { name, description })
      .then(res => {
        setItems([...items, res.data]);
        setName('');
        setDescription('');
      })
      .catch(err => console.error(err));
  };

  const deleteItem = (id) => {
    axios.delete(`/api/items/${id}`)
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>CRUD App</h1>
      <div className="input-group">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="items-list">
        {items.map(item => (
          <div className="item-card" key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button className="delete-button" onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
