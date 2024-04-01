"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import movies from "../../movies.json";
import Bookmark from "./bookmark";

interface Movie {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  isTrending?: boolean;
}

export default function RecommendedBigScreen() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const notTrendingMovies = movies.filter((movie) => !movie.isTrending);

    const randomMovies: Movie[] = [];

    while (randomMovies.length < 5) {
      const randomIndex = Math.floor(Math.random() * notTrendingMovies.length);
      //hämtar en slumpad film från arrayen med hjälp av randomIndex-värdet
      const randomMovie = notTrendingMovies[randomIndex];
      //kollar så att samma film inte kan pushas in och visas flera gånger
      if (!randomMovies.some((movie) => movie.title === randomMovie.title)) {
        randomMovies.push(randomMovie);
      }
    }
    //uppdaterar state med de slumpade filmerna
    setRecommendedMovies(randomMovies);
  }, []);

  return (
    <div className="hidden grid-cols-2 justify-center gap-7 sm:hidden md:grid lg:grid-cols-3">
      {recommendedMovies.map((movie) => (
        <Link href={`/movie/${movie.title}`} key={movie.title}>
          <div
            /* eslint-disable-next-line tailwindcss/migration-from-tailwind-2, tailwindcss/no-custom-classname */
            className="flex h-full flex-col justify-between rounded-md bg-white bg-opacity-50"
            key={movie.title}
          >
            <h3 className="p-3 text-center font-bold">{movie.title}</h3>
            <Image
              src={movie.thumbnail}
              height={100}
              width={100}
              alt={movie.title}
              style={{
                height: "100%",
                width: "auto",
                paddingRight: "20px",
                paddingLeft: "20px",
              }}
            ></Image>
            <div className="flex flex-row items-center justify-between px-7 py-5">
              <p>{movie.year}</p>
              <div className="flex flex-row items-center">
                <p>{movie.rating}</p>
                <p>
                  <Bookmark movieTitle={movie.title} />
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
