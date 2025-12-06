import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";

function Navbar() {
  const { isAuthenticated, usuario, cerrarSesion, esAdmin } = useAuth();
  const { carrito, vaciarCarrito } = useCart();
  const navigate = useNavigate();

  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    if (window.confirm('¿Seguro que querés cerrar sesión?')) {
      vaciarCarrito();
      cerrarSesion();
      navigate('/productos');
    }
  };

  const irAlCarrito = () => navigate('/pagar');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          ElectroPlus
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            {esAdmin() && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <>
                <span className="text-white text-center text-lg-start">
                  <FaUser className="me-1" />
                  Hola, {usuario?.nombre}!
                </span>

                <button
                  onClick={irAlCarrito}
                  className="btn btn-danger position-relative w-100 w-lg-auto"
                >
                  <FaShoppingCart className="me-1" />
                  Carrito
                  {cantidadItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {cantidadItems}
                    </span>
                  )}
                </button>

                <button
                  onClick={manejarCerrarSesion}
                  className="btn btn-outline-light w-100 w-lg-auto"
                >
                  <FaSignOutAlt className="me-1" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/iniciar-sesion"
                className="btn btn-outline-light w-100 w-lg-auto"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;