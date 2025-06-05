// src/components/Footer.jsx
import React from "react";
import "../css/Footer.css";

export default function Footer({ vista, setVista }) {
  return (
    <footer className="footer">
      <h3>🎬 MovieApp</h3>
      <p>Todas las peliculas que buscas en un solo lugar</p>
      <div className="footer-links">
        <button
          onClick={() => setVista("inicio")}
          className={vista === "inicio" ? "active" : ""}
        >
          Inicio
        </button>
        <button
          onClick={() => setVista("favoritas")}
          className={vista === "favoritas" ? "active" : ""}
        >
          Favoritas
        </button>
        <button
          onClick={() => setVista("estrenos")}
          className={vista === "estrenos" ? "active" : ""}
        >
          Estrenos
        </button>
      </div>
      <small>
        © {new Date().getFullYear()} MovieApp. Todos los derechos reservados.
      </small>
    </footer>
  );
}
