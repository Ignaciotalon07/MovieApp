import React from "react";
import CardMovie from "./CardMovie";

const estrenosFake = [
  {
    imdbID: "tt12361974",
    Title: "Guardians of the Galaxy Vol. 3",
    Poster:
      "https://imgs.search.brave.com/-YiUDNUZ67CBeHMKTlmQXL-dFyh6BGoEpaP37of64aE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxUW9HbklSRlJM/LmpwZw",
    Year: 2023,
  },
  {
    imdbID: "tt9419884",
    Title: "John Wick: Chapter 4",
    Poster:
      "https://imgs.search.brave.com/vgLBcST8pk2SUQbM1Xn0kDx_DKieY3pvjO8eqC53Bzg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdjL2E2/LzM0LzdjYTYzNGMy/NTBkMDgzMjlmNDQ3/ODUyMjVmMTRlNjlh/LmpwZw",
    Year: 2023,
  },
  {
    imdbID: "tt3581652",
    Title: "Top Gun: Maverick",
    Poster:
      "https://imgs.search.brave.com/oZG3Rpxn68xDKzonYQLCFVsqURIZa3aEvWxliCfghmo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNDYw/MzM1NC5qcGc",
    Year: 2022,
  },
  {
    imdbID: "tt1464335",
    Title: "Spider-Man: No Way Home",
    Poster:
      "https://imgs.search.brave.com/mwwwELLKv7fw2kYoS4H5vFy1mudC6LJ1nM36igTvHtk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/b2ZmaWNpYWwtcG9z/dGVyLWZvci10aGUt/c3BpZGVyLW1hbi1u/by13YXktaG9tZS1y/ZS1yZWxlYXNlLXYw/LXV4cjJxOWJqajlq/OTEuanBnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPWVkMjhmMzIx/NDM5NzUxNTA1MWYz/YjA1M2RlMzAwNGIx/OTM0NzUyMzE",
    Year: 2021,
  },
  {
    imdbID: "tt9243946",
    Title: "The Batman",
    Poster:
      "https://imgs.search.brave.com/I_0d0xDAIahx0CxucsbQCQCa_BTAtEuDDB8ftaT_1nk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZiLzI0/L2M1L2ZiMjRjNWEw/NzEzZjZkMTQ1NTM5/N2ZhNzhlOTE0NDg2/LmpwZw",
    Year: 2022,
  },
  {
    imdbID: "tt8367814",
    Title: "Dune",
    Poster:
      "https://imgs.search.brave.com/im0RdYpA2jZzmnxPpgJcZ_enU9CvYMIIs4xZ9Wgk7mo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/b2ZmaWNpYWwtcG9z/dGVyLWZvci1kdW5l/LXBhcnQtdHdvLXYw/LTZrcmd4bTAyeWZ4/YTEuanBnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPTYzMjk1NDQx/MzNhN2QzNTUxNzI0/OGNlMmU3YjY5OTNl/N2IyNjVjYzc",
    Year: 2024,
  },
];

export default function Estrenos({ agregarAFavoritos, favoritas }) {
  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {estrenosFake.map((pelicula) => (
          <CardMovie
            key={pelicula.imdbID}
            titulo={pelicula.Title}
            poster={pelicula.Poster}
            year={pelicula.Year}
            imdbID={pelicula.imdbID}
            esFavorita={favoritas.some((fav) => fav.imdbID === pelicula.imdbID)}
            onAgregarFavorito={() => agregarAFavoritos(pelicula)}
          />
        ))}
      </div>
    </div>
  );
}
