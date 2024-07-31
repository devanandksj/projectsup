import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Use selector to get the authentication state

const ProtectedRoute = ({ element, ...rest }) => {
  
  const isAdmin = useSelector(state => state.auth.isAdmin); // Access isAdmin state from Redux
  const isAuthenticated=useSelector(state => state.auth.isAuthenticated);
  
  if (!isAdmin && isAuthenticated ) {
    return element;
  }
  else if(!isAdmin ){
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
