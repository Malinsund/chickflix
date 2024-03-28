"use client"

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Bookmark from "./bookmark";
import movies from "../../movies.json";
import Image from "next/image";

export default function TrendingMovies() {
    const [opacity, setOpacity] = useState(1);
  const [currentSlide, setSlide] = useState(0);

  const filteredMovies = movies.filter((movie) => movie.isTrending === true);
  const length = filteredMovies.length;
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

  const currentMovie = filteredMovies[currentSlide];

    return (
        <div className="flex flex-row gap-2 md:hidden">
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
              <h3 className="text-center">{currentMovie.title}</h3>
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
              <div className="flex flex-row justify-between p-5">
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
    );
}