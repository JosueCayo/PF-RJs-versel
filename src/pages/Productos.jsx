import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye, FaCartPlus, FaSearch } from "react-icons/fa";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  const { agregarAlCarrito } = useCart();
  const { esAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://68f5a4ff6b852b1d6f14a3db.mockapi.io/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  const productosFiltrados = useMemo(() => {
    let filtrados = [...productos];

    if (busqueda.trim()) {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (categoriaFiltro !== "todas") {
      filtrados = filtrados.filter((p) => p.categoria === categoriaFiltro);
    }

    return filtrados;
  }, [productos, busqueda, categoriaFiltro]);

  const categorias = useMemo(() => {
    const cats = [...new Set(productos.map((p) => p.categoria).filter(Boolean))];
    return cats.sort();
  }, [productos]);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (nueva) => {
    setPaginaActual(nueva);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoriaFiltro("todas");
    setPaginaActual(1);
  };

  if (cargando)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center">Error: {error}</div>;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">
        Nuestros Productos
      </h1>

      <div className="row g-3 mb-4 align-items-end">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <select
            className="form-select form-select-lg"
            value={categoriaFiltro}
            onChange={(e) => {
              setCategoriaFiltro(e.target.value);
              setPaginaActual(1);
            }}
          >
            <option value="todas">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-outline-secondary btn-lg w-100" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </div>


      {productosPaginados.length === 0 ? (
        <div className="text-center py-5">
          <p className="lead">No hay productos que coincidan con tu búsqueda.</p>
          <button className="btn btn-primary" onClick={limpiarFiltros}>
            Ver todos los productos
          </button>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {productosPaginados.map((producto) => (
              <div key={producto.id} className="col">
                <div className="card h-100 shadow-sm hover-shadow">
                  <img
                    src={producto.imagen || "/multimedia/no-image.png"}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: "220px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                  />
                  <div className="card-body d-flex flex-column">
                    {producto.categoria && (
                      <span className="badge bg-secondary mb-2">{producto.categoria}</span>
                    )}
                    <h5 className="card-title text-center">{producto.nombre}</h5>
                    <p className="card-text text-center fs-4 fw-bold text-success">
                      ${producto.precio}
                    </p>

                    <div className="mt-auto d-grid gap-2">
                      <Link
                        to={`/productos/${(producto.categoria || 'sin-categoria').toLowerCase().replace(/\s+/g, '-')}/${producto.nombre.toLowerCase().replace(/\s+/g, '-')}-${producto.id}`}
                        state={{ producto }}
                        className="btn btn-outline-primary"
                      >
                        <FaEye className="me-2" /> Ver Detalle
                      </Link>
                      <button onClick={() => handleAgregar(producto)} className="btn btn-success">
                        <FaCartPlus className="me-2" /> Agregar al Carrito
                      </button>
                    </div>

                    {esAdmin() && (
                      <div className="mt-3 pt-3 border-top d-flex gap-2">
                        <button
                          onClick={() => navigate(`/editar-producto/${producto.id}`, { state: { producto } })}
                          className="btn btn-warning btn-sm flex-fill"
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                           onClick={() => navigate('/eliminar-productos', { state: { producto } })}
                           className="btn btn-danger btn-sm flex-fill"
                          >
                         <FaTrash /> Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPaginas > 1 && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>
                    Anterior
                  </button>
                </li>

                {[...Array(totalPaginas)].map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => cambiarPagina(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}