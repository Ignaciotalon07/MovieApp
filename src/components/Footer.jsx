import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer({ vista, setVista }) {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-12 px-8 max-w-7xl mx-auto rounded-lg shadow-lg flex flex-col md:flex-row justify-between gap-12">
      <div className="flex flex-col items-center md:items-start space-y-4">
        <a href="/" className="flex gap-3 items-center justify-center text-3xl">
          <img src="/ico1.svg" alt="icono" className="h-8 w-8" />
          <span>MovieApp</span>
        </a>
        <p className="text-sm md:text-base  max-w-xs italic text-gray-400">
          Todas las películas que buscas en un solo lugar
        </p>
      </div>

      <nav className="flex flex-col items-center md:items-start gap-4 text-lg font-semibold tracking-wide">
        {["inicio", "favoritas", "estrenos"].map((item) => (
          <button
            key={item}
            onClick={() => setVista(item)}
            className={`relative px-2 py-1 group transition-all duration-300 overflow-hidden
          ${
            vista === item
              ? "text-yellow-500 font-bold"
              : "text-gray-400 hover:text-yellow-500"
          }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
          </button>
        ))}
      </nav>

      {/* Redes sociales */}
      <div className="flex flex-col items-center md:items-end space-y-6">
        <small className="text-gray-500 text-xs md:text-sm text-center md:text-right select-none">
          © {new Date().getFullYear()} MovieApp. Todos los derechos reservados.
        </small>
        <div className="flex gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition-colors"
          >
            <Twitter size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}
