import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar-1">
        
        <Link to="/admin" className="nav-link"><button>Admin</button></Link>
        <Link to="/login" className="nav-link"><button>Login</button></Link>
        <Link to="/register" className="nav-link"><button>Register</button></Link>
      </nav>
      <nav className='navbar-2'>
      
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/employee-management">Employee</Link></li>
          <li><Link to="/customers">Customer</Link></li>
          
        </ul>
        
      </nav>

      
    </div>
  );
};

export default Navbar;
