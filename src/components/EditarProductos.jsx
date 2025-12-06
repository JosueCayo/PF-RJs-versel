import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSave, FaArrowLeft, FaImage, FaTag, FaDollarSign } from 'react-icons/fa';

export default function EditarProductos() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const productoOriginal = state?.producto;

  if (!productoOriginal) {
    toast.error('No se encontró el producto');
    navigate('/productos');
    return null;
  }

  const [producto, setProducto] = useState({
    ...productoOriginal,
    categoria: productoOriginal.categoria || 'Sin categoría',
    imagen: productoOriginal.imagen || '',
    descripcion: productoOriginal.descripcion || ''
  });

  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const err = {};

    if (!producto.nombre?.trim()) err.nombre = 'El nombre es obligatorio.';
    if (!producto.precio?.trim()) err.precio = 'El precio es obligatorio.';
    else if (isNaN(parseFloat(producto.precio.replace(',', '.')))) {
      err.precio = 'Ingresa un precio válido.';
    }
    if (!producto.descripcion?.trim()) err.descripcion = 'La descripción es obligatoria.';
    else if (producto.descripcion.length < 10) err.descripcion = 'Mínimo 10 caracteres.';
    else if (producto.descripcion.length > 200) err.descripcion = 'Máximo 200 caracteres.';

    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(',', '.')
      };

      const res = await fetch(
        `https://68f5a4ff6b852b1d6f14a3db.mockapi.io/productos/${producto.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productoEnviar),
        }
      );

      if (!res.ok) throw new Error('Error al actualizar');

      toast.success('¡Producto actualizado correctamente!', {
        position: "top-center",
        autoClose: 3000
      });
      navigate('/productos');
    } catch (err) {
      toast.error('Error al actualizar el producto');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-warning text-dark d-flex align-items-center">
              <FaSave className="me-3 fs-3" />
              <h3 className="mb-0">Editar Producto</h3>
            </div>

            <div className="card-body p-5">
              <form onSubmit={manejarEnvio}>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FaTag className="me-2 text-primary" /> Nombre del producto *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ''}
                    onChange={manejarCambio}
                    className={`form-control form-control-lg ${errores.nombre ? 'is-invalid' : ''}`}
                    placeholder="Ej: Heladera Samsung 500L"
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FaDollarSign className="me-2 text-success" /> Precio *
                  </label>
                  <input
                    type="text"
                    name="precio"
                    value={producto.precio || ''}
                    onChange={manejarCambio}
                    className={`form-control form-control-lg ${errores.precio ? 'is-invalid' : ''}`}
                    placeholder="Ej: 850000 o 850.000"
                  />
                  {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Categoría
                  </label>
                  <input
                    type="text"
                    name="categoria"
                    value={producto.categoria || ''}
                    onChange={manejarCambio}
                    className="form-control form-control-lg"
                    placeholder="Ej: Heladeras, Televisores..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FaImage className="me-2 text-info" /> Imagen (URL)
                  </label>
                  <input
                    type="url"
                    name="imagen"
                    value={producto.imagen || ''}
                    onChange={manejarCambio}
                    className="form-control form-control-lg"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {producto.imagen && (
                    <div className="mt-3 text-center">
                      <img
                        src={producto.imagen}
                        alt="Vista previa"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Descripción * ({producto.descripcion?.length || 0}/500)
                  </label>
                  <textarea
                    name="descripcion"
                    value={producto.descripcion || ''}
                    onChange={manejarCambio}
                    rows="5"
                    maxLength={200}
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    placeholder="Describe el producto (mínimo 10 caracteres)"
                  />
                  {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                </div>

                <div className="d-grid d-md-flex justify-content-md-end gap-3 mt-5">
                 <button
                    type="submit"
                    disabled={cargando}
                    className="btn btn-warning btn-lg px-5 shadow"
                  >
                    {cargando ? (
                      <>Guardando...</>
                    ) : (
                      <>
                        <FaSave className="me-2" /> Confirmar Cambios
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/productos')}
                    className="btn btn-secondary btn-lg px-4"
                  >
                    <FaArrowLeft className="me-2" /> Cancelar
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