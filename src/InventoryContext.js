import React, { createContext, useContext, useState } from 'react';

// Create the Inventory Context
const InventoryContext = createContext();

// Inventory Provider Component
export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  // Function to add a product to the inventory
  const addProductToInventory = (product) => {
    setInventory((prevInventory) => {
      const existingProductIndex = prevInventory.findIndex(
        (item) => item.barcode === product.barcode
      );

      if (existingProductIndex !== -1) {
        // Update the existing product's quantity
        const updatedInventory = [...prevInventory];
        updatedInventory[existingProductIndex].quantity += product.quantity;
        return updatedInventory;
      } else {
        // Add the new product to the inventory
        return [...prevInventory, product];
      }
    });
  };

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, addProductToInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom Hook to use the Inventory Context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
