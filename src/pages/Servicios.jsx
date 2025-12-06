import React from 'react';

export default function Servicios() {
  return (
    <div
      className="min-vh-100 position-relative d-flex align-items-center"
      style={{
        backgroundImage: "url('/multimedia/servicios.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="text-center text-white mb-5">
          <h1 className="display-3 fw-bold text-shadow">Contáctanos</h1>
          <p className="lead fs-3">Estamos para ayudarte en todo lo que necesites</p>
        </div>

        <div className="row justify-content-center g-5">
          <div className="col-lg-5">
            <div className="bg-white bg-opacity-95 rounded-4 shadow-lg p-5">
              <h2 className="text-primary text-center mb-4">Envíanos tu mensaje</h2>
              <form action="https://formspree.io/f/xblongkj" method="POST">
                <div className="mb-4">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    className="form-control form-control-lg rounded-pill"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    className="form-control form-control-lg rounded-pill"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="mensaje"
                    rows="6"
                    placeholder="¿En qué podemos ayudarte?"
                    className="form-control form-control-lg rounded-3"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 rounded-pill shadow"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bg-white bg-opacity-95 rounded-4 shadow-lg p-5 h-100">
              <h3 className="text-primary mb-4">Nuestra ubicación</h3>
              <p className="lead mb-4">
                <strong>Dirección:</strong><br />
                Av. Corrientes 2345, C1046AAB<br />
                Ciudad Autónoma de Buenos Aires, Argentina
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Corrientes+2345,+C1046AAB,+Buenos+Aires,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg d-block mb-4 rounded-pill"
              >
                Abrir en Google Maps
              </a>

              <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow">
                <iframe
                  title="Ubicación ElectroPlus"
                  src="https://www.google.com/maps?q=Av.+Corrientes+2345,+C1046AAB,+Ciudad+Autónoma+de+Buenos+Aires,+Argentina&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-white mt-5">
          <p className="fs-4">
            ¡Te respondemos en menos de 24 hs!
          </p>
        </div>
      </div>

      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}