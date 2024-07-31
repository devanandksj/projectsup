import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customer.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/customers');
      const customersData = response.data;

      // Create a dictionary to count visits by phone number
      const visitCountDict = {};

      const customersWithVisitCount = customersData.map(customer => {
        if (visitCountDict[customer.phone]) {
          visitCountDict[customer.phone]++;
        } else {
          visitCountDict[customer.phone] = 1;
        }
        return { ...customer, visitCount: visitCountDict[customer.phone] };
      });

      setCustomers(customersWithVisitCount);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  const handleSelectCustomer = (customer) => {
    const updatedCustomers = customers.map(c =>
      c.phone === customer.phone ? { ...c } : c
    );

    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomers.find(c => c.phone === customer.phone));
  };

  return (
    <div className="customer-management">
      <h1 className="title">Customer Information</h1>
      <div className="customer-list">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="customer-item"
            onClick={() => handleSelectCustomer(customer)}
          >
            <div className="customer-info">
              <h3 className="customer-name">{customer.name}</h3>
              <p><strong>Visits:</strong> {customer.visitCount}</p> {/* Display visit count */}
            </div>
          </div>
        ))}
      </div>
      {selectedCustomer && (
        <div className="customer-details">
          <h2 className="details-title">Customer Details</h2>
          <div className="details-content">
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
            <p><strong>Visits:</strong> {selectedCustomer.visitCount}</p> {/* Display visit count */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
