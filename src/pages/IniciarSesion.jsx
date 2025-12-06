import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function IniciarSesion() {
  const [formulario, setFormulario] = useState({ nombre: '', email: '' });
  const { iniciarSesion, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/productos';
      const destinoFinal = usuario?.rol === 'admin' ? '/dashboard' : from;
      navigate(destinoFinal, { replace: true });
    }
  }, [isAuthenticated, usuario, location.state, navigate]);

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!formulario.nombre.trim() || !formulario.email.trim()) {
      alert('Completá ambos campos');
      return;
    }

    const esAdminLogin = formulario.nombre.toLowerCase() === "admin" && formulario.email === "1234@admin";

    const usuarioData = esAdminLogin
      ? { nombre: 'admin', email: '1234@admin', rol: 'admin' }
      : { nombre: formulario.nombre, email: formulario.email, rol: 'user' };

    iniciarSesion(usuarioData);

  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h2>
      <form onSubmit={manejarEnvio}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Usuario:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.9rem',
            background: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          Iniciar Sesión
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '0.9rem' }}>
        <p><strong>Admin:</strong> Usuario: <code>admin</code> Email: <code>1234@admin</code></p>
      </div>
    </div>
  );
}

export default IniciarSesion;