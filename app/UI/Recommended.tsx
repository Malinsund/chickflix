"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
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
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-xl text-white">Recommended for You</h1>
      <div className="flex flex-row gap-2">
        {" "}
        {/*md:hidden*/}
        <div className="flex items-center justify-center">
          <ChevronDoubleLeftIcon
            onClick={previous}
            className="size-7 cursor-pointer text-white hover:text-blue-400"
          ></ChevronDoubleLeftIcon>
        </div>
        <div className="grow">
          <Link href={`/movie/${currentMovie.title}`} key={currentMovie.title}>
            <div
              key={currentSlide}
              /* eslint-disable-next-line tailwindcss/migration-from-tailwind-2, tailwindcss/no-custom-classname */
              className="movie-thumbnail flex flex-col justify-center bg-white bg-opacity-50"
              style={{ opacity: opacity }}
            >
              <h3 className="text-center font-bold">{currentMovie.title}</h3>
              <Image
                src={currentMovie.thumbnail}
                height={100}
                width={100}
                alt={currentMovie.title}
                style={{
                  height: "100%",
                  width: "auto",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              />
              <div className="flex flex-row justify-between px-7 py-5">
                <p>{currentMovie.year}</p>
                <div className="flex flex-row">
                  <p>{currentMovie.rating}</p>
                  <p>
                    <Bookmark movieTitle={currentMovie.title} />
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <ChevronDoubleRightIcon
            onClick={next}
            className="size-7 cursor-pointer text-white hover:text-blue-400"
          ></ChevronDoubleRightIcon>
        </div>
      </div>
    </div>
  );
}
