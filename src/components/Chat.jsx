import React, { useState, useEffect } from "react";
import "../css/Chat.css";

export default function ChatFlotante() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const toggleChat = () => setAbierto(!abierto);
  useEffect(() => {
    if (abierto && mensajes.length === 0) {
      setMensajes([
        {
          rol: "assistant",
          contenido: `¡Hola! Soy tu asistente experto en cine. Estoy aquí para ayudarte a descubrir películas que te encantarán y responder cualquier consulta que tengas sobre cine. Preguntame sobre géneros, actores, recomendaciones personalizadas o cualquier película que tengas en mente. ¡Empecemos!`,
        },
      ]);
    }
  }, [abierto, mensajes]);

  const enviarMensaje = async () => {
    if (!input.trim()) return;

    const nuevoMensaje = { rol: "user", contenido: input };
    const nuevosMensajes = [...mensajes, nuevoMensaje];
    setMensajes(nuevosMensajes);
    setInput("");
    setCargando(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY; // Asegurate de tener esto en tu .env

    try {
      const respuesta = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct", // o el modelo que quieras usar
            max_tokens: 1000, // 🔥 esto limita el tamaño de la respuesta
            messages: [
              {
                role: "system",
                content:
                  "Sos un experto en cine y recomendás películas. respuestas cortas, claras y en español.",
              },
              ...nuevosMensajes.map((m) => ({
                role: m.rol === "user" ? "user" : "assistant",
                content: m.contenido,
              })),
            ],
          }),
        }
      );

      const data = await respuesta.json();

      if (data.choices && data.choices.length > 0) {
        const respuestaChat = data.choices[0].message.content;
        setMensajes((prev) => [
          ...prev,
          { rol: "assistant", contenido: respuestaChat },
        ]);
      } else {
        setMensajes((prev) => [
          ...prev,
          {
            rol: "assistant",
            contenido: "Ups, hubo un problema. Intentá de nuevo más tarde.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error al llamar a la API", error);
      setMensajes((prev) => [
        ...prev,
        {
          rol: "assistant",
          contenido:
            "Error de conexión o de clave. Verificá tu .env y los permisos.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <div className="chat-flotante">
      {abierto && (
        <div className="chat-box">
          <div className="chat-header">
            🎬 Asistente de Películas
            <button className="cerrar" onClick={toggleChat}>
              ✖
            </button>
          </div>
          <div className="chat-mensajes">
            {mensajes.map((msg, index) => (
              <div
                key={index}
                className={`mensaje ${
                  msg.rol === "user" ? "usuario" : "asistente"
                }`}
              >
                {msg.contenido}
              </div>
            ))}
            {cargando && (
              <div className="mensaje asistente">Escribiendo...</div>
            )}
            {error && <div className="mensaje error">{error}</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Recomendame una peli..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={cargando}
            />
            <button onClick={enviarMensaje} disabled={cargando}>
              Enviar
            </button>
          </div>
        </div>
      )}

      <button className="boton-chat" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
}
