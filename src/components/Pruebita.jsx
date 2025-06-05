import React, { useEffect, useState } from "react";

export default function Pruebita() {
  const [nombre, setNombre] = useState("Marcos");

  function handleClick() {
    setNombre("Ignacio");
  }

  useEffect(() => {
    console.log("El nombre cambio a: ", nombre);
  }, [nombre]);

  return (
    <div>
      <button onClick={handleClick}>{nombre}</button>
    </div>
  );
}
