import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaTrash, FaCheckCircle } from "react-icons/fa";

export default function Pagar() {
  const { usuario } = useAuth();
  const { carrito, aumentarCantidad, disminuirCantidad, vaciarCarrito, calcularTotal, formatearMoneda } = useCart();
  const navigate = useNavigate();

  const comprar = () => {
    toast.success("¡Compra realizada con éxito! Gracias por tu compra", { autoClose: 5000 });
    vaciarCarrito();
    navigate("/productos");
  };

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <button onClick={() => navigate("/productos")} className="btn btn-primary mt-3">
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3><FaCheckCircle className="me-2" />Finalizar Compra</h3>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <strong>¡Hola, {usuario?.nombre}!</strong> Estás a un paso de completar tu compra.
              </div>

              {carrito.map((item) => (
                <div key={item.id} className="border rounded p-3 mb-3 d-flex align-items-center">
                  {item.imagen && <img src={item.imagen} alt={item.nombre} className="me-3" style={{ width: "80px", height: "80px", objectFit: "contain" }} />}
                  <div className="flex-grow-1">
                    <h5>{item.nombre}</h5>
                    <p className="text-success fw-bold">{formatearMoneda(item.precioNumerico)}</p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button onClick={() => disminuirCantidad(item.id)} className="btn btn-outline-danger btn-sm"><FaMinus /></button>
                    <span className="px-3 fw-bold">{item.cantidad}</span>
                    <button onClick={() => aumentarCantidad(item.id)} className="btn btn-outline-success btn-sm"><FaPlus /></button>
                  </div>
                </div>
              ))}

              <div className="text-end mt-4">
                <h2>Total: {formatearMoneda(calcularTotal())}</h2>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button onClick={comprar} className="btn btn-success btn-lg">
                  Confirmar Pago
                </button>
                <button onClick={() => navigate("/productos")} className="btn btn-outline-secondary btn-lg">
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}