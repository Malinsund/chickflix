"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import movies from "/movies.json";

interface Movie {
  title: string;
  actor: string;
  genre: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const results = movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="m-auto">
      <input
        className="rounded-3xl p-2 mr-5 w-96 my-5 text-white bg-white bg-opacity-50"
        type="search"
        placeholder="Search movie.."
        value={searchTerm}
        onChange={handleSearch}
      />
      {showResults && searchResults.length > 0 && (
        <div className="absolute bg-white text-black shadow-md rounded-lg mt-1 p-2">
          {searchResults.map((movie) => (
            <Link
              key={movie.title}
              href={`/movie/${movie.title}`}
              onClick={handleClearSearch}
            >
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
