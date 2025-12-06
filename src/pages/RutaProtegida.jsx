import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ children, soloAdmin = false }) {
  const { isAuthenticated, usuario } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" state={{ from: location.pathname }} replace />;
  }

  if (soloAdmin && usuario?.rol !== 'admin') {
    return <Navigate to="/productos" replace />;
  }

  return children;
}

export default RutaProtegida;