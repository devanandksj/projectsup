import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  const handleBarcodeScan = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:3001/inventory?barcode=${barcode}`);
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

  const handleAddToCart = () => {
    if (!product) return;

    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }

    setProduct(null);
    setBarcode('');
    setQuantity(1);
    setShowPaymentMethod(true);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    let customer = selectedCustomer;
    if (!customer) {
      if (newCustomer.name && newCustomer.phone) {
        try {
          const response = await axios.post('http://localhost:3001/customers', newCustomer);
          customer = response.data;
          setCustomers([...customers, customer]);
        } catch (error) {
          console.error('Error adding new customer', error);
          alert('Error adding new customer.');
          return;
        }
      } else {
        customer = { name: 'Guest' };
      }
    }

    const newReceipts = cart.map((item) => ({
      product: item.product.item,
      quantity: item.quantity,
      total: item.product.price * item.quantity,
      paymentMethod: paymentMethod,
      customer: customer.name,
    }));

    try {
      await Promise.all(
        cart.map((item) =>
          axios.put(`http://localhost:3001/inventory/${item.product.id}`, {
            ...item.product,
            quantity: item.product.quantity - item.quantity,
          })
        )
      );
      await Promise.all(newReceipts.map((receipt) => axios.post('http://localhost:3001/sales', receipt)));
      setReceipt(newReceipts);
      setCart([]);
      setShowPaymentMethod(false);
      alert('Cart checked out successfully');
      setBarcode('');
      setNewCustomer({ name: '', phone: '' });
      if (barcodeInputRef.current) {
        barcodeInputRef.current.focus();
      }
    } catch (error) {
      console.error('Error processing sale', error);
      alert('Failed to process sale.');
    }
  };

  const handleGenerateReceipt = () => {
    const totalAmount = receipt.reduce((acc, item) => acc + item.total, 0);

    const receiptWindow = window.open('', 'PRINT', 'height=400,width=600');
    receiptWindow.document.write('<html><head><title>Receipt</title>');
    receiptWindow.document.write('</head><body>');
    receiptWindow.document.write('<h1>Receipt</h1>');
    receiptWindow.document.write('<table>');
    receiptWindow.document.write('<tr><th>Product</th><th>Quantity</th><th>Total</th><th>Payment Method</th><th>Customer</th></tr>');
    receipt.forEach(item => {
      receiptWindow.document.write(
        `<tr><td>${item.product}</td><td>${item.quantity}</td><td>$${item.total.toFixed(2)}</td><td>${item.paymentMethod}</td><td>${item.customer}</td></tr>`
      );
    });
    receiptWindow.document.write(`<tr><td colspan="3">Grand Total</td><td colspan="2">$${totalAmount.toFixed(2)}</td></tr>`);
    receiptWindow.document.write('</table>');
    receiptWindow.document.write('</body></html>');
    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();
    receiptWindow.close();
  };

  const getTotalAmount = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setNewCustomer({ name: '', phone: '' });
  };

  const handleNewCustomerChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    setSelectedCustomer(null);
  };

  return (
    <div className="products-container">
      <header className="header">
        <h2>Barcode Scanner</h2>
      </header>
      
      <form className="barcode-form" onSubmit={handleBarcodeScan}>
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

      {product && (
        <div className="product-details">
          <h3>{product.item}</h3>
          <p className="price">Price: ${product.price}</p>
          <p className="stock">Stock: {product.quantity}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            placeholder="Quantity"
            required
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}

      <div className="cart-summary">
        {cart.length > 0 && (
          <div className="cart">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <p>{item.product.item}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="cart-total">
              <p><strong>Total: ${getTotalAmount().toFixed(2)}</strong></p>
            </div>
          </div>
        )}
      </div>

      {showPaymentMethod && (
        <form className="checkout-form" onSubmit={handleCheckout}>
          <h3>Select Payment Method</h3>
          <div className="payment-method">
            <label>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                id="credit"
                name="paymentMethod"
                value="credit"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Credit
            </label>
            <label>
              <input
                type="radio"
                id="debit"
                name="paymentMethod"
                value="debit"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Debit
            </label>
          </div>
          <div className="new-customer">
            <h3>Enter New Customer Details</h3>
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleNewCustomerChange}
              placeholder="Customer Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={newCustomer.phone}
              onChange={handleNewCustomerChange}
              placeholder="Customer Phone"
              required
            />
          </div>
          <button type="submit">Checkout</button>
        </form>
      )}

      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          <ul>
            {receipt.map((item, index) => (
              <li key={index}>
                {item.quantity} x {item.product} = ${item.total.toFixed(2)} ({item.paymentMethod}) [{item.customer}]
              </li>
            ))}
          </ul>
          <button onClick={handleGenerateReceipt}>Print Receipt</button>
        </div>
      )}
    </div>
  );
};

export default Products;
