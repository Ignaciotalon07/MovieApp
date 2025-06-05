import React from "react";
import BuscadorPelis from "./BuscadorPelis";
import Favoritas from "./Favoritas";
import Estrenos from "./Estrenos";
import PeliculasInicio from "./PeliculasInicio";

export default function Main({
  vista,
  busqueda,
  favoritas,
  agregarAFavoritos,
  eliminarDeFavoritos,
}) {
  return (
    <>
      {vista === "inicio" && (
        <>
          {busqueda === "" ? (
            <PeliculasInicio
              agregarAFavoritos={agregarAFavoritos}
              favoritas={favoritas}
            />
          ) : (
            <BuscadorPelis
              busqueda={busqueda}
              agregarAFavoritos={agregarAFavoritos}
              favoritas={favoritas}
            />
          )}
        </>
      )}
      {vista === "favoritas" && (
        <Favoritas
          favoritas={favoritas}
          eliminarDeFavoritos={eliminarDeFavoritos}
        />
      )}
      {vista === "estrenos" && (
        <Estrenos agregarAFavoritos={agregarAFavoritos} favoritas={favoritas} />
      )}
    </>
  );
}
