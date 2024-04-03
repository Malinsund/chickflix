"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import movies from "../../movies.json";

interface Movie {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);

  const featureFlag = (): boolean => {
    const flagValue = localStorage.getItem("feature");
    return flagValue ? JSON.parse(flagValue) : true;
  };

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredResults = movies.filter((movie: Movie) => {
      if (featureFlag()) {
        return movie.title.toLowerCase().startsWith(term) || movie.genre.toLowerCase().includes(term);
      } else {
        return movie.title.toLowerCase().startsWith(term);
      }
    });

    setSearchResults(filteredResults);
    setShowResults(true);
  }

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
    <div ref={searchRef}>
      <input
        /* eslint-disable-next-line tailwindcss/migration-from-tailwind-2  */
        className="my-5 mr-5 w-96 rounded-3xl bg-white bg-opacity-50 p-2 text-white"
        type="search"
        placeholder="Search movie.."
        value={searchTerm}
        onChange={handleSearch}
      />
      {showResults && searchResults.length > 0 && (
        <div className="absolute mt-1 rounded-lg bg-white p-2 text-black shadow-md">
          {searchResults.map((movie) => (
            <Link
              key={movie.title}
              href={`/movie/${encodeURIComponent(movie.title.replaceAll(" ", "-").toLowerCase())}`}
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
