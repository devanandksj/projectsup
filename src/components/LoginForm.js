import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: users } = await axios.get("http://localhost:3001/users");
      const userFound = users.find(u => u.username === user.username && u.password === user.password);
      if (userFound) {
        alert("Login successful");
        navigate('/');
      } else {
        alert("Invalid credentials");
        navigate('/register');
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  
  return (
    <div className="login-form">
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
      <Link to="/">
        <button type="submit">Login</button>
      </Link>
    </form>
    </div>
  );
};

export default LoginForm;
