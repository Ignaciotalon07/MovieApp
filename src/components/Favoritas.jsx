import React from "react";
import CardMovie from "./CardMovie";

export default function Favoritas({ favoritas, eliminarDeFavoritos }) {
  return (
    <div className="container-peliculas">
      {favoritas.length === 0 ? (
        <p className="mensaje-vacio">
          ⭐ Aún no agregaste ninguna a favoritas.
        </p>
      ) : (
        favoritas.map((pelicula) => (
          <div>
            <h3 className="title-favoritas">Aqui tus peliculas favoritas</h3>
            <CardMovie
              key={pelicula.imdbID}
              titulo={pelicula.Title}
              poster={pelicula.Poster}
              year={pelicula.Year}
              imdbID={pelicula.imdbID}
              esFavorita={true}
              onEliminarFavorito={() => eliminarDeFavoritos(pelicula.imdbID)}
            />
          </div>
        ))
      )}
    </div>
  );
}
