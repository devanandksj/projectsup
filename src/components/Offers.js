import React from 'react';
import './Offers.css';

const Offers = () => {
  const products = [
    {
      imgSrc: '/Image/tomato.jpeg',
      name: 'Tomato',
      description: 'Fresh and juicy tomatoes',
      price: 'Offer price:$50-1kg'
    },
    {
      imgSrc: '/Image/onion.jpeg',
      name: 'Onion',
      description: 'Crisp and flavorful onions',
      price: 'Offer price:$89-3kg'
    },
    {
      imgSrc: '/Image/potato.jpeg',
      name: 'Potato',
      description: 'High-quality potatoes',
      price: 'Offer price:$79.99-9kg'
    },
    {
      imgSrc: '/Image/knife.jpeg',
      name: 'Knife',
      description: 'Sharp kitchen knife',
      price: 'Offer price:$69.99-10kg'
    },
    {
      imgSrc: '/Image/watermelon.jpeg',
      name: 'Watermelon',
      description: 'Sweet and refreshing watermelon',
      price: 'Offer price:$59.99-10kg'
    },
    {
      imgSrc: '/Image/apple.jpeg',
      name: 'Apple',
      description: 'Crisp and sweet apples',
      price: 'Offer price:$49.99-3kg'
    },
    {
      imgSrc: '/Image/banana.jpeg',
      name: 'Banana',
      description: 'Ripe and delicious bananas',
      price: 'Offer price:$39.99-7kg'
    },
    {
      imgSrc: '/Image/mango.jpeg',
      name: 'Mango',
      description: 'Juicy and sweet grapes',
      price: 'Offer price:$29.99-7kg'
    },
    {
      imgSrc: '/Image/grapes.jpeg',
      name: 'Grapes',
      description: 'Juicy and sweet grapes',
      price: 'Offer price:$29.99-10kg'
    },
    
    {
      imgSrc: '/Image/pineapple.jpeg',
      name: 'Pineapple',
      description: 'Juicy and sweet grapes',
      price: 'Offer price:$29.99-14kg'
    }
    // Add more products as needed
  ];

  return (
    <div className="offers-page">
      <h1>Offers</h1>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imgSrc} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="price">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
