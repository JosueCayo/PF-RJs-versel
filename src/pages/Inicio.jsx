import React from 'react';

const frases = [
  '¡Tu tienda de confianza en electrodomésticos!',
  '¡Pasá y llevate lo que necesites!',
  '¡No te lo pierdas!',
  '¡Bienvenido!',
  '¡Las mejores ofertas del año!',
  '¡Calidad garantizada en cada producto!'
];

const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

export default function Inicio() {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center position-relative text-white text-center min-vh-100"
        style={{
          backgroundImage: `url('/multimedia/inicio.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
        />

        <div className="container position-relative px-4">
          <h1 className="display-1 fw-bold mb-4 text-shadow">
            Tienda ElectroPlus
          </h1>
          <hr className="bg-white mx-auto mb-5" style={{ width: '220px', height: '5px', opacity: 0.9 }} />
          
          <p className="lead fs-2 mb-5 fw-medium text-shadow">
            {fraseAleatoria}
          </p>

          <div className="d-flex flex-column flex-sm-row gap-4 justify-content-center mt-5">
            <a
              href="/productos"
              className="btn btn-primary btn-lg px-5 py-3 fs-5 shadow-lg"
              style={{ minWidth: '220px' }}
            >
              Ver Productos
            </a>
            <a
              href="/servicios"
              className="btn btn-outline-light btn-lg px-5 py-3 fs-5 shadow-lg"
              style={{ minWidth: '220px' }}
            >
              Nuestros Servicios
            </a>
          </div>
        </div>
      </div>
    </>
  );
}