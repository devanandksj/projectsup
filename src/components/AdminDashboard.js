import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/suppliers');
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/suppliers', newSupplier);
      const { data } = await axios.get('http://localhost:3001/suppliers');
      setSuppliers(data);
      setNewSupplier({ name: '', contact: '', email: '' });
      alert('Supplier added successfully');
    } catch (error) {
      console.error('Error adding supplier', error);
    }
  };

  const goToInventory = () => {
    navigate('/inventory');
  };

  return (
    <div className="admin-dashboard">
      <h2>Suppliers Detail</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            <Link to={`/suppliers/${supplier.id}`}>
              {supplier.name} - {supplier.contact}
            </Link>
          </li>
        ))}
      </ul>
       <div className="add-supplier-form"> 
      <form onSubmit={handleAddSupplier} className="add-supplier-form">
        <h3>Add New Supplier</h3>
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={newSupplier.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newSupplier.contact}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newSupplier.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Supplier</button>
      </form>
        </div>
      <button className="go-to-inventory" onClick={goToInventory}>
        Go to Inventory
      </button>
    </div>
  );
};

export default AdminDashboard;
