import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      try {
        setCarrito(JSON.parse(guardado));
      } catch (error) {
        console.error('Error al leer el carrito:', error);
        setCarrito([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const precioToNum = (precio) => {
    if (!precio) return 0;
    return parseFloat(precio.toString().replace(/\./g, '').replace(',', '.')) || 0;
  };

  const agregarAlCarrito = (producto) => {
    const precioNum = precioToNum(producto.precio);
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1, precioNumerico: precioNum }];
    });
  };

  const aumentarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) => {
      const nuevo = prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0);
      return nuevo;
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precioNumerico * item.cantidad, 0);

  const cantidadTotalItems = () =>
    carrito.reduce((total, item) => total + item.cantidad, 0);

  const formatearMoneda = (numero) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(numero);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        calcularTotal,
        cantidadTotalItems,
        formatearMoneda,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};