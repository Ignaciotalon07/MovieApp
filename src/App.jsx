import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
import Footer from "./components/Footer";
import ChatFlotante from "./components/Chat";
window.Swal = Swal;

function App() {
  const [vista, setVista] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [favoritas, setFavoritas] = useState([]);
  const [peliculasInicio, setPeliculasInicio] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.omdbapi.com/?apikey=fdc7a607&s=avengers&type=movie&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setPeliculasInicio(data.Search || []);
      });
  }, []);

  function agregarAFavoritos(pelicula) {
    const yaExiste = favoritas.some((p) => p.imdbID === pelicula.imdbID);
    if (!yaExiste) {
      setFavoritas([...favoritas, pelicula]);

      window.Swal.fire({
        title: "🎉 Agregado a Favoritos!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  }

  function eliminarDeFavoritos(imdbID) {
    const nuevasFavoritas = favoritas.filter((peli) => peli.imdbID !== imdbID);
    setFavoritas(nuevasFavoritas);
    window.Swal.fire({
      title: "Eliminado de Favoritos!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }

  return (
    <>
      <Header
        vista={vista}
        setVista={setVista}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      <Main
        vista={vista}
        busqueda={busqueda}
        favoritas={favoritas}
        agregarAFavoritos={agregarAFavoritos}
        eliminarDeFavoritos={eliminarDeFavoritos}
        peliculasInicio={peliculasInicio}
      />
      <Footer vista={vista} setVista={setVista} />
      <ChatFlotante />
    </>
  );
}

export default App;
