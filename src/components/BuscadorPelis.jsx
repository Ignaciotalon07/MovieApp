import { useEffect, useState } from "react";
import CardMovie from "./CardMovie";

export default function BuscadorPelis({
  busqueda,
  favoritas,
  agregarAFavoritos,
}) {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    if (busqueda.length < 3) {
      setPeliculas([]);
      return;
    }

    fetch(`http://www.omdbapi.com/?apikey=fdc7a607&s=${busqueda}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setPeliculas(data.Search);
        } else {
          setPeliculas([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setPeliculas([]);
      });
  }, [busqueda]);

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      {peliculas.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No se encontraron películas.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {peliculas.map((pelicula) => (
            <CardMovie
              key={pelicula.imdbID}
              titulo={pelicula.Title}
              poster={pelicula.Poster}
              year={pelicula.Year}
              esFavorita={favoritas.some(
                (fav) => fav.imdbID === pelicula.imdbID
              )}
              onAgregarFavorito={() => agregarAFavoritos(pelicula)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
