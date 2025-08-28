import React from "react";

export default function CardMovie({
  titulo,
  poster,
  year,
  onAgregarFavorito,
  esFavorita,
  onEliminarFavorito,
}) {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-lg">
      <img
        src={poster !== "N/A" ? poster : "https://via.placeholder.com/150"}
        alt={titulo}
        className="w-full h-72 object-cover rounded-md mb-4"
      />

      <h4 className="text-lg font-semibold mb-1">{titulo}</h4>

      <p className="text-sm text-gray-400 mb-3">{year}</p>

      {!esFavorita && onAgregarFavorito && (
        <button
          onClick={onAgregarFavorito}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Agregar a Favoritas
        </button>
      )}

      {esFavorita && onEliminarFavorito && (
        <button
          onClick={onEliminarFavorito}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Eliminar de Favoritas
        </button>
      )}

      {esFavorita && !onEliminarFavorito && (
        <span className="text-yellow-400 text-xl mt-2">⭐</span>
      )}
    </div>
  );
}
