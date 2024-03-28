"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import movies from "../../movies.json";
import Bookmark from "./bookmark";

//interface för typen som ska användas i vårt state
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

export default function RecommendedMovies() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [opacity, setOpacity] = useState(1);
  const [currentSlide, setSlide] = useState(0);

  //hämtar filmer som inte är trending och slumpar fram 5 filmer
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
  const length = recommendedMovies.length;
  const fadeDuration = 500;
  const next = () => {
    setOpacity(0);
    setTimeout(() => {
      setSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
      setOpacity(1);
    }, fadeDuration);
  };
  const previous = () => {
    setOpacity(0);
    setTimeout(() => {
      setSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
      setOpacity(1);
    }, fadeDuration);
  };
  const currentMovie = recommendedMovies[currentSlide];

  return (
    <div>
      <h1 className="text-center text-xl text-white">Recommended for You</h1>
      <div>
        {recommendedMovies.map((movie) => (
          <Link href={`/movie/${movie.title}`} key={movie.title}>
            <div
              // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
              className="m-5 flex flex-col bg-white bg-opacity-50"
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
              <div className="flex flex-row justify-between p-5">
                <p>{movie.year}</p>
                <div className="flex flex-row">
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
    </div>
  );
}
