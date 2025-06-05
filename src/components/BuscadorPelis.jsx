import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import "../css/BuscadorPelis.css";

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
    <div className="container-peliculas">
      {peliculas.map((pelicula) => (
        <CardMovie
          key={pelicula.imdbID}
          titulo={pelicula.Title}
          poster={pelicula.Poster}
          year={pelicula.Year}
          esFavorita={favoritas.some((fav) => fav.imdbID === pelicula.imdbID)}
          onAgregarFavorito={() => agregarAFavoritos(pelicula)}
        />
      ))}
    </div>
  );
}
