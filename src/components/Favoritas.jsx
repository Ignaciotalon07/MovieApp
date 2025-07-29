import React from "react";
import CardMovie from "./CardMovie";

export default function Favoritas({ favoritas, eliminarDeFavoritos }) {
  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      {favoritas.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          ⭐ Aún no agregaste ninguna a favoritas.
        </p>
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-white mb-6">
            ⭐ Aquí tus películas favoritas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritas.map((pelicula) => (
              <CardMovie
                key={pelicula.imdbID}
                titulo={pelicula.Title}
                poster={pelicula.Poster}
                year={pelicula.Year}
                imdbID={pelicula.imdbID}
                esFavorita={true}
                onEliminarFavorito={() => eliminarDeFavoritos(pelicula.imdbID)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
