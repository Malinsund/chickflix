"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import movies from "../movies.json";
import RecommendedMovies from "./UI/Recommended";
import Bookmark from "./UI/bookmark";
import SearchBar from "./UI/searchbar";

export default function Home() {
  const [currentSlide, setSlide] = useState(0);

  const filteredMovies = movies.filter((movie) => movie.isTrending === true);
  const length = filteredMovies.length;
  const next = () => {
    setSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };
  const previous = () => {
    setSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  const currentMovie = filteredMovies[currentSlide];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <h1 className="text-center text-white">Trending right now</h1>

      <div className="flex flex-row gap-2">
        <div className="flex items-center justify-center"> 
        <ChevronDoubleLeftIcon
          onClick={previous}
          className="size-7 cursor-pointer text-white hover:text-blue-400"
        ></ChevronDoubleLeftIcon>
        </div>
        <div className="grow">
        <Link href={`/movie/${currentMovie.title}`} key={currentMovie.title}>
          {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
          <div className="flex flex-col justify-center bg-white bg-opacity-50">
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
      <RecommendedMovies />
    </div>
  );
}
