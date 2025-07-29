export default function Header({ vista, setVista, busqueda, setBusqueda }) {
  function handleChange(e) {
    setBusqueda(e.target.value);
  }

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
      <div className="text-xl font-semibold flex items-center gap-2">
        <span>🎬</span>
        <span>MovieApp</span>
      </div>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar película..."
          value={busqueda}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <nav className="flex gap-4">
        {["inicio", "favoritas", "estrenos"].map((item) => (
          <button
            key={item}
            onClick={() => setVista(item)}
            className={`relative px-3 py-1 group transition-all duration-300 overflow-hidden
        ${
          vista === item
            ? "text-yellow-500 font-semibold"
            : "text-gray-400 hover:text-yellow-500"
        }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}

            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
          </button>
        ))}
      </nav>
    </header>
  );
}
