import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/offers');
  };

  return (
    <div className="homepage">
      <div className="content">
        <img 
          src="/Image/homescreen.jpeg" 
          alt="Home" 
          className="home-image" 
          onClick={handleImageClick} 
        />
      </div>
    </div>
  );
};

export default HomePage;
