import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
