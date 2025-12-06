import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito, formatearMoneda, calcularTotal, cantidadTotalItems } = useCart();
  const navigate = useNavigate();

  if (carrito.length === 0) return null;

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Carrito de Compras ({cantidadTotalItems()})</h4>
        </div>
        <div className="card-body">
          {carrito.map(item => (
            <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-3">
              <div>
                <strong>{item.nombre}</strong> × {item.cantidad}
              </div>
              <div className="text-success fw-bold">
                {formatearMoneda(item.precioNumerico * item.cantidad)}
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: {formatearMoneda(calcularTotal())}</h4>
            <div>
              <button onClick={() => navigate("/pagar")} className="btn btn-success me-2">
                Ir cambiar
              </button>
              <button onClick={vaciarCarrito} className="btn btn-outline-danger">
                <FaTrash /> Vaciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}