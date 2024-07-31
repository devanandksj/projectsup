import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './InventoryDetails.css';
import { useInventory } from '../InventoryContext';

const InventoryDetails = () => {
  const { inventory, addProductToInventory } = useInventory();
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inventoryList, setInventoryList] = useState([]);
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/inventory');
      setInventoryList(response.data);
    } catch (error) {
      console.error('Error fetching inventory', error);
    }
  };

  const handleBarcodeScan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/inventory?barcode=${barcode}`);
      const data = response.data;
      if (data.length > 0) {
        setProduct(data[0]);
      } else {
        alert('Product not found.');
      }
    } catch (error) {
      console.error('Error fetching product details', error);
      alert('Error fetching product details.');
    }
  };

  const handleUpdateInventory = async (e) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct = {
      ...product,
      quantity: product.quantity + parseInt(quantity),
    };

    try {
      await axios.put(`http://localhost:3001/inventory/${product.id}`, updatedProduct);
      fetchInventory(); // Refresh the inventory list
      setProduct(null);
      setBarcode('');
      setQuantity(1);
    } catch (error) {
      console.error('Error updating inventory', error);
      alert('Error updating inventory.');
    }
  };

  return (
    <div className="inventory-details">
      <h2>Inventory Details</h2>

      {/* Barcode Scan Form */}
      <div className="barcode-form">
      <form onSubmit={handleBarcodeScan} >
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Scan Barcode"
          required
          ref={barcodeInputRef}
        />
        <button type="submit">Scan</button>
      </form>
      </div>

      {/* Product Details */}
      {product && (
        <div className="product-details">
          <h3>{product.item}</h3>
          
          <p>Price: ${product.price}</p>
          <p>Current Stock: {product.quantity}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            placeholder="Quantity"
            required
          />
          <button className="updateinventory" onClick={handleUpdateInventory}>Update Inventory</button>
        </div>
      )}

      {/* Inventory List */}
      <h3>Inventory List</h3>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Barcode</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {inventoryList.map((item) => (
            <tr key={item.id}>
              <td>{item.item}</td>
              <td>{item.barcode}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDetails;
