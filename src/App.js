import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { InventoryProvider } from './InventoryContext';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SupplierDetails from './components/SupplierDetails';
import InventoryDetails from './components/InventoryDetails';
import Products from './components/Products';
import EmployeeManagement from './components/EmployeeManagement';
import Customer from './components/Customer';
import Offers from './components/Offers'; // Import the Offer component

import './App.css';


const App = () => {
  return (
    <Provider store={store}>
      <InventoryProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin-dashboard"
                element={<ProtectedRoute element={<AdminDashboard />} />}
              />
              <Route
                path="/suppliers/:id"
                element={<ProtectedRoute element={<SupplierDetails />} />}
              />
              <Route
                path="/inventory"
                element={<ProtectedRoute element={<InventoryDetails />} />}
              />
              <Route
                path="/products"
                element={<ProtectedRoute element={<Products />} />}
              />
              <Route
                path="/employee-management"
                element={<ProtectedRoute element={<EmployeeManagement />} />}
              />
              <Route
                path="/customers"
                element={<ProtectedRoute element={<Customer />} />}
              />
              <Route path="/offers" element={<Offers />} /> {/* Add this line */}
            </Routes>
          </div>
        </Router>
      </InventoryProvider>
    </Provider>
  );
};

export default App;
