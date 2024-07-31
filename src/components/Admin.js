import React, { useState } from 'react';
import './Admin.css'; // Ensure this path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAsAdmin } from '../Redux/authSlice';

const Admin = () => {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: admins } = await axios.get("http://localhost:3001/admins");
      const adminFound = admins.find(a => a.username === admin.username && a.password === admin.password);
      if (adminFound) {
        alert("Admin login successful");
        dispatch(loginAsAdmin());
        navigate('/admin-dashboard');
      } else {
        alert("Invalid admin credentials");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="admin-login-form">
    <form onSubmit={handleSubmit} >
      <center><h2>Admin Login</h2></center>
      <input
        type="text"
        name="username"
        value={admin.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={admin.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Admin;
