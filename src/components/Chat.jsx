import React, { useState, useEffect } from "react";

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

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

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
            model: "mistralai/mistral-7b-instruct",
            max_tokens: 1000,
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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat box */}
      {abierto && (
        <div className="w-80 bg-gray-900 text-white rounded-lg shadow-xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-800 px-4 py-2 font-semibold text-yellow-400">
            <span>🎬 Asistente de Películas</span>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-yellow-400 transition"
              aria-label="Cerrar chat"
            >
              ✖
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 max-h-96 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {mensajes.map((msg, index) => (
              <div
                key={index}
                className={`rounded-md p-2 max-w-[75%] ${
                  msg.rol === "user"
                    ? "bg-yellow-500 text-gray-900 self-end"
                    : "bg-gray-700 text-yellow-300 self-start"
                }`}
              >
                {msg.contenido}
              </div>
            ))}
            {cargando && (
              <div className="bg-gray-700 text-yellow-300 rounded-md p-2 max-w-[75%]">
                Escribiendo...
              </div>
            )}
            {error && (
              <div className="bg-red-600 text-white rounded-md p-2 max-w-[75%]">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-700">
            <input
              type="text"
              placeholder="Recomendame una peli..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={cargando}
              className="flex-1 px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={enviarMensaje}
              disabled={cargando}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 text-gray-900 font-semibold transition"
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      {!abierto && (
        <button
          onClick={toggleChat}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl transition fixed bottom-6 right-6 z-50"
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}
    </div>
  );
}
