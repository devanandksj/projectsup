import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/users', user);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div className='registration-form'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <center><button type="submit">Register</button></center>
      </form>
    </div>
  );
};

export default RegistrationForm;
