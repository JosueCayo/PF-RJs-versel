import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('usuario');
    if (saved) {
      const userData = JSON.parse(saved);
      setUsuario(userData);
      setIsAuthenticated(true);
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (datosUsuario) => {
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
    setIsAuthenticated(true);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setIsAuthenticated(false);
  };

  const esAdmin = () => usuario?.rol === 'admin';

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated,
        cargando,
        iniciarSesion,
        cerrarSesion,
        esAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};