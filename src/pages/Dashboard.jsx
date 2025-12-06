import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GrAdd, GrUserAdmin } from "react-icons/gr";

export default function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-dark text-white text-center py-4 rounded-top-4">
              <h1 className="mb-0 fs-2 fw-bold">
                <GrUserAdmin className="me-3" />
                Dashboard Administrativo
              </h1>
            </div>

            <div className="card-body p-5">
              <div className="alert alert-success text-center rounded-3 py-4 mb-5">
                <strong>Sesión iniciada como:</strong>
                <h3 className="mt-2 mb-0 fw-bold">{usuario?.nombre || 'Admin'}</h3>
              </div>

              <div className="row g-4">

                <div className="col-md-4">
                  <Link
                    to="/productos"
                    className="btn btn-info btn-lg w-100 py-4 shadow-lg text-white d-flex flex-column align-items-center justify-content-center text-decoration-none"
                  >
                    <GrUserAdmin className="fs-3 mb-2" />
                    <span className="fw-bold">Gestionar Productos</span>
                  </Link>
                </div>

                <div className="col-md-4">
                  <button
                    onClick={() => navigate('/agregar-producto')}
                    className="btn btn-success btn-lg w-100 py-4 shadow-lg d-flex flex-column align-items-center justify-content-center"
                  >
                    <GrAdd className="fs-3 mb-2" />
                    <span className="fw-bold">Agregar Producto</span>
                  </button>
                </div>

                <div className="col-md-4">
                  <button
                    onClick={() => navigate('/eliminar-productos')}
                    className="btn btn-danger btn-lg w-100 py-4 shadow-lg d-flex flex-column align-items-center justify-content-center"
                  >
                    <FaTrash className="fs-3 mb-2" />
                    <span className="fw-bold">Eliminar Productos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}