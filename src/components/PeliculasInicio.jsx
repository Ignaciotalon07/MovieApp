import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";

export default function PeliculasInicio({ agregarAFavoritos, favoritas }) {
  const [peliculas, setPeliculas] = useState([]);
  const [page, setPage] = useState(1);

  // Cargar películas al inicio y/o cuando cambia la página
  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=fdc7a607&s=movie&type=movie&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setPeliculas((prev) => [...prev, ...data.Search]);
        }
      });
  }, [page]);

  // Función para cargar más peliculas
  const cargarMasPeliculas = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 text-center mb-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">
          ¿No sabes qué peli mirar hoy?
        </h3>
        <p className="text-sm text-gray-300">
          ¡No te preocupes! Tenemos un chat las 24hs para sacarte dudas de
          cualquier película que quieras, recomendarte las mejores del momento o
          volver a ver esas joyitas que creías olvidadas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...new Map(peliculas.map((p) => [p.imdbID, p])).values()].map(
          (peli) => (
            <CardMovie
              key={peli.imdbID}
              titulo={peli.Title}
              poster={peli.Poster}
              year={peli.Year}
              imdbID={peli.imdbID}
              esFavorita={favoritas.some((f) => f.imdbID === peli.imdbID)}
              onAgregarFavorito={() => agregarAFavoritos(peli)}
            />
          )
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={cargarMasPeliculas}
          className="bg-yellow-400 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg text-sm font-semibold transition cursor-pointer"
        >
          🎬 Cargar más películas
        </button>
      </div>
    </div>
  );
}
