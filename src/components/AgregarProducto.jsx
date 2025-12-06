import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

export default function AgregarProducto() {
  const [producto, setProducto] = useState({
    nombre: '', precio: '', descripcion: '', categoria: '', imagen: ''
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'descripcion' && value.length > 200) return;
    setProducto(prev => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: '' }));
  };

  const validarFormulario = () => {
    const errorDeCarga = {};

    if (!producto.nombre.trim()) errorDeCarga.nombre = 'El nombre es obligatorio.';
    if (!producto.precio.trim()) {
      errorDeCarga.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio.replace(/\./g, '').replace(',', '.');
      const precioNum = parseFloat(precioLimpio);
      if (isNaN(precioNum) || precioNum <= 0) errorDeCarga.precio = 'Precio inválido.';
    }
    if (!producto.descripcion.trim()) errorDeCarga.descripcion = 'La descripción es obligatoria.';
    else if (producto.descripcion.length < 10) errorDeCarga.descripcion = 'Mínimo 10 caracteres.';
    else if (producto.descripcion.length > 200) errorDeCarga.descripcion = 'Máximo 200 caracteres.';

    setErrores(errorDeCarga);
    return Object.keys(errorDeCarga).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.replace(',', '.')
      };

      const res = await fetch('https://68f5a4ff6b852b1d6f14a3db.mockapi.io/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEnviar),
      });

      if (!res.ok) throw new Error('Error al agregar');

      toast.success('¡Producto agregado con éxito!');
      if (window.confirm('¿Deseas agregar otro producto?')) {
        setProducto({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '' });
      } else {
        navigate('/productos');
      }} 
      catch (err) {
      toast.error('Error al agregar el producto');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0"><FaSave className="me-2" />Agregar Nuevo Producto</h3>
            </div>
            <div className="card-body">
              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre *</label>
                  <input
                    type="text" name="nombre" value={producto.nombre} onChange={manejarCambio}
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    placeholder="Ej: Heladera Samsung"
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Precio *</label>
                  <input
                    type="text" name="precio" value={producto.precio} onChange={manejarCambio}
                    className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                    placeholder="Ej: 450000 o 450.000"
                  />
                  {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Categoría</label>
                  <input
                    type="text" name="categoria" value={producto.categoria} onChange={manejarCambio}
                    className="form-control"
                    placeholder="Ej: Heladeras, Televisores..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Imagen (URL)</label>
                  <input
                    type="url" name="imagen" value={producto.imagen} onChange={manejarCambio}
                    className="form-control"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Descripción * ({producto.descripcion.length}/500)</label>
                  <textarea
                    name="descripcion" value={producto.descripcion} onChange={manejarCambio}
                    rows="4" className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    placeholder="Mínimo 10 caracteres..."
                  />
                  {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" disabled={cargando} className="btn btn-success">
                    {cargando ? 'Guardando...' : 'Agregar Producto'}
                  </button>
                  <button type="button" onClick={() => navigate('/productos')} className="btn btn-secondary me-md-2">
                    <FaArrowLeft className="me-2" />Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}