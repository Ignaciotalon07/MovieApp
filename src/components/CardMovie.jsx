import React from "react";
import "../css/CardMovie.css";

export default function CardMovie({
  titulo,
  poster,
  year,
  onAgregarFavorito,
  esFavorita,
  onEliminarFavorito,
}) {
  return (
    <div className="card-movie">
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/150"}
        alt={titulo}
        className="card-movie-img"
      />
      <h4 className="card-movie-title">{titulo}</h4>
      <p className="card-movie-year">{year}</p>
      {!esFavorita && onAgregarFavorito && (
        <button onClick={onAgregarFavorito} className="btn-fav">
          ⭐ Agregar a Favoritas
        </button>
      )}
      {esFavorita && onEliminarFavorito && (
        <button onClick={onEliminarFavorito} className="btn-remove">
          ❌ Eliminar de Favoritas
        </button>
      )}
      {esFavorita && !onEliminarFavorito && (
        <span className="favorito-icon">⭐</span>
      )}
    </div>
  );
}
