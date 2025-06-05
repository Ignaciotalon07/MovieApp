import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import "../css/PeliculasInicio.css";

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
    <div className="peliculas-inicio">
      <div className="cartel">
        <h3>¿No sabes que peli mirar hoy?</h3>
        <p>
          No te preocupes! tenemos un chat las 24hs para sacarte dudas de
          cualquier pelicula que quieras, recomendarte las mejores peliculas del
          momento o volver a ver esas joyitas que creias olvidadas.
        </p>
      </div>

      <div className="lista-peliculas">
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

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button onClick={cargarMasPeliculas} className="btn-cargar-mas">
          🎬 Cargar más películas
        </button>
      </div>
    </div>
  );
}
