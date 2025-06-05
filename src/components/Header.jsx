// src/components/Header.jsx
import React from "react";
import "../css/Header.css";

export default function Header({ vista, setVista, busqueda, setBusqueda }) {
  function handleChange(e) {
    setBusqueda(e.target.value);
  }

  return (
    <header className="header">
      <div className="logo">
        <span>🎬 MovieApp</span>
      </div>
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar película..."
          value={busqueda}
          onChange={handleChange}
        />
      </div>
      <nav className="nav">
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
      </nav>
    </header>
  );
}
