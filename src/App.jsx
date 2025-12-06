// src/App.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/DetalleProductos";
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/IniciarSesion";
import Dashboard from "./pages/Dashboard";
import AgregarProducto from "./components/AgregarProducto";
import EditarProductos from "./components/EditarProductos";
import EliminarProductos from "./components/EliminarProductos";
import Layout from "./components/Layout"; // ← NUEVO

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Todas las rutas usan el mismo Layout (Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:categoria/:slug" element={<ProductoDetalle />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />

            <Route
              path="/dashboard"
              element={
                <RutaProtegida soloAdmin={true}>
                  <Dashboard />
                </RutaProtegida>
              }
            />

            <Route
              path="/pagar"
              element={
                <RutaProtegida>
                  <Pagar />
                </RutaProtegida>
              }
            />

            <Route
              path="/agregar-producto"
              element={
                <RutaProtegida soloAdmin={true}>
                  <AgregarProducto />
                </RutaProtegida>
              }
            />

            <Route
              path="/editar-producto/:id"
              element={
                <RutaProtegida soloAdmin={true}>
                  <EditarProductos />
                </RutaProtegida>
              }
            />

            <Route
              path="/eliminar-productos"
              element={
                <RutaProtegida soloAdmin={true}>
                  <EliminarProductos />
                </RutaProtegida>
              }
            />

            <Route path="*" element={<Navigate to="/productos" replace />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;