import React, { useState, useEffect } from "react";

export default function CardMovie({
  titulo,
  poster,
  year,
  genero,
  duracion,
  imdbID, //
  onAgregarFavorito,
  esFavorita,
  onEliminarFavorito,
}) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [detalles, setDetalles] = useState(null);

  const toggleModal = () => setAbrirModal(!abrirModal);

  // 👇 Cuando se abre el modal, pedimos la descripción
  useEffect(() => {
    if (abrirModal) {
      fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=fdc7a607`)
        .then((res) => res.json())
        .then((data) => setDetalles(data))
        .catch((err) => console.error(err));
    }
  }, [abrirModal, imdbID]);

  return (
    <>
      {/* CARD */}
      <div
        onClick={toggleModal}
        className="bg-gray-800 text-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <img
          src={poster !== "N/A" ? poster : "https://via.placeholder.com/150"}
          alt={titulo}
          className="w-full h-72 object-cover rounded-md mb-4"
        />

        <h4 className="text-lg font-semibold mb-1">{titulo}</h4>
        <p className="text-sm text-gray-400 mb-3">{year}</p>

        {!esFavorita && onAgregarFavorito && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAgregarFavorito();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition cursor-pointer"
          >
            Agregar a Favoritas
          </button>
        )}

        {esFavorita && onEliminarFavorito && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEliminarFavorito();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition cursor-pointer"
          >
            Eliminar de Favoritas
          </button>
        )}

        {esFavorita && !onEliminarFavorito && (
          <span className="text-yellow-400 text-xl mt-2">⭐</span>
        )}
      </div>

      {/* MODAL SOLO DESCRIPCIÓN */}
      {abrirModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={toggleModal}
        >
          <div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl p-8 w-[28rem] relative transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-all text-2xl"
            >
              ✖
            </button>

            {/* Título */}
            <h2 className="text-3xl font-extrabold mb-4 text-yellow-400 tracking-wide text-center">
              {titulo}
            </h2>

            {/* Descripción */}
            <p className="text-gray-300 leading-relaxed text-lg text-center">
              {detalles?.Plot || "Cargando descripción..."}
            </p>

            <div className="flex justify-between text-sm text-gray-400 mt-4">
              <p>
                <span className="text-yellow-500 font-black mr-1">
                  Duracion:
                </span>
                {detalles?.Runtime || "Desconocida"}
              </p>
              <p>
                <span className="text-yellow-500 font-black mr-1">Genero:</span>
                {detalles?.Genre || "Desconocido"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
