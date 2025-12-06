import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function DetalleProductos() {
  const location = useLocation();
  const producto = location.state?.producto;
  const { agregarAlCarrito } = useCart();

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          No se pudo cargar el producto.
        </div>
        <Link to="/productos" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0 overflow-hidden">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ minHeight: "500px" }}>
                  <img
                    src={producto.imagen || "/multimedia/no-image.png"}
                    alt={producto.nombre}
                    className="img-fluid rounded-3 shadow"
                    style={{
                      maxHeight: "500px",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-body p-5">
                  {producto.categoria && (
                    <span className="badge bg-secondary fs-6 mb-3">
                      {producto.categoria}
                    </span>
                  )}

                  <h1 className="display-5 fw-bold text-primary mb-4">
                    {producto.nombre}
                  </h1>

                  <div className="mb-4">
                    <p className="fs-1 fw-bold text-success mb-0">
                      ${producto.precio}
                    </p>
                    {producto.precio && (
                      <small className="text-muted">
                        <FaCheckCircle className="text-success me-1" />
                        Stock disponible
                      </small>
                    )}
                  </div>

                  <div className="mb-5">
                    <h4 className="text-dark fw-semibold mb-3">Descripción</h4>
                    <p className="lead text-muted" style={{ lineHeight: "1.7" }}>
                      {producto.descripcion || "Sin descripción disponible."}
                    </p>
                  </div>

                  <div className="d-grid gap-3 d-md-flex">
                    <button
                      onClick={handleAgregar}
                      className="btn btn-success btn-lg px-5 py-3 rounded-pill shadow-lg d-flex align-items-center justify-content-center"
                    >
                      <FaCartPlus className="me-3 fs-4" />
                      Agregar al Carrito
                    </button>

                    <Link to="/productos" className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-pill">
                      <FaArrowLeft className="me-2" />
                      Volver a Productos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}