import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaSearch, FaArrowLeft, FaCheckSquare, FaSquare } from 'react-icons/fa';

export default function EliminarProductos() {
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const productoInicial = location.state?.producto;

  useEffect(() => {
    fetch('https://68f5a4ff6b852b1d6f14a3db.mockapi.io/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setFiltrados(data);
        setCargando(false);

        if (productoInicial) {
          setSeleccionados([productoInicial.id]);
        }
      })
      .catch(() => {
        toast.error('Error al cargar productos');
        setCargando(false);
      });
  }, [productoInicial]);

  useEffect(() => {
    const term = busqueda.toLowerCase();
    const resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      (p.categoria && p.categoria.toLowerCase().includes(term))
    );
    setFiltrados(resultados);
  }, [busqueda, productos]);

  const toggleProducto = (id) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const seleccionarTodos = () => {
    if (seleccionados.length === filtrados.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(filtrados.map(p => p.id));
    }
  };

  const eliminarSeleccionados = async () => {
    if (seleccionados.length === 0) {
      toast.warning('Seleccioná al menos un producto');
      return;
    }

    if (!window.confirm(`¿Estás seguro de eliminar ${seleccionados.length} producto(s)? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await Promise.all(
        seleccionados.map(id =>
          fetch(`https://68f5a4ff6b852b1d6f14a3db.mockapi.io/productos/${id}`, {
            method: 'DELETE'
          })
        )
      );

      setProductos(prev => prev.filter(p => !seleccionados.includes(p.id)));
      setSeleccionados([]);
      toast.success(`${seleccionados.length} producto(s) eliminado(s) correctamente`);
    } catch (err) {
      toast.error('Error al eliminar productos');
    }
  };

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border text-danger" /></div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <button onClick={() => navigate(-1)} className="btn btn-secondary me-3">
          <FaArrowLeft /> Volver
        </button>
        <h1 className="display-5 fw-bold text-danger mb-0">
          <FaTrash className="me-3" />Eliminar Productos
        </h1>
      </div>

      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="card shadow h-100">
            <div className="card-header bg-dark text-white">
              <div className="input-group">
                <span className="input-group-text"><FaSearch /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div className="card-body p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {filtrados.length === 0 ? (
                <div className="p-4 text-center text-muted">No se encontraron productos</div>
              ) : (
                <ul className="list-group list-group-flush">
                  {filtrados.map(prod => (
                    <li key={prod.id} className="list-group-item d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input me-3"
                        checked={seleccionados.includes(prod.id)}
                        onChange={() => toggleProducto(prod.id)}
                      />
                      <img
                        src={prod.imagen || "/multimedia/no-image.png"}
                        alt={prod.nombre}
                        style={{ width: 50, height: 50, objectFit: 'contain' }}
                        className="me-3 rounded"
                      />
                      <div className="flex-grow-1">
                        <div className="fw-bold">{prod.nombre}</div>
                        <small className="text-muted">{prod.categoria || 'Sin categoría'}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card-footer bg-light">
              <button
                onClick={seleccionarTodos}
                className="btn btn-outline-primary btn-sm"
              >
                {seleccionados.length === filtrados.length ? <FaCheckSquare /> : <FaSquare />} Seleccionar todos
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow">
            <div className="card-body text-center py-5">
              <h2 className="display-6">Productos a eliminar</h2>
              <h3 className="text-danger fw-bold">{seleccionados.length}</h3>
              <p className="text-muted">seleccionado(s)</p>

              {seleccionados.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={eliminarSeleccionados}
                    className="btn btn-danger btn-lg px-5"
                  >
                    <FaTrash className="me-2" />
                    Eliminar seleccionados
                  </button>
                </div>
              )}

              {seleccionados.length === 0 && (
                <p className="text-muted">Seleccioná uno o más productos de la lista</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}