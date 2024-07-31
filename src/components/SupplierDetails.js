import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { useInventory } from '../InventoryContext';
import './SupplierDetails.css';

const SupplierDetails = () => {
  const { id } = useParams();
  const { addProductToInventory } = useInventory();
  const [supplier, setSupplier] = useState(null);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch supplier details if needed
    // For simplicity, we're skipping this
    setSupplier({ name: 'Supplier A', contact: '1234567890', email: 'supplier@example.com' });
  }, [id]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newInventoryItem = {
      item: product,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      barcode,
      supplierId: id,
    };

    try {
      // Make a POST request to add the new product to the inventory
      await axios.post('http://localhost:3001/inventory', newInventoryItem);
      addProductToInventory(newInventoryItem);

      alert('Product added to inventory successfully');
      setProduct('');
      setQuantity('');
      setPrice('');
      setBarcode('');
    } catch (error) {
      console.error('Error adding product to inventory', error);
      alert('Failed to add product to inventory');
    }
  };

  const goToInventory = () => {
    navigate('/inventory');
  };

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="supplier-details">
      <h2>{supplier.name}</h2>
      <p>Contact: {supplier.contact}</p>
      <p>Email: {supplier.email}</p>
      <div className="add-product-form">
      <form onSubmit={handleAddProduct} >
        <h3>Add Product to Inventory</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      </div>

      <button className="go-to-inventory"onClick={goToInventory}>
      Go To Inventory
      </button>
    </div>
  );
};

export default SupplierDetails;
