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
  return (
    <div>
      <div className="flex justify-center">
        <SearchBar />
      </div>

      {filteredMovies.map((movie, index) => (
        <Link href={`/movie/${movie.title}`} key={movie.title}>
          <div
            className={`${
              index === currentSlide ? "block" : "hidden"
            } mx-2 flex flex-col justify-center bg-white bg-opacity-50 m-5] `}
            key={movie.title}
          >
            <h3 className="text-center p-3">{movie.title}</h3>
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
      <div className="flex flex-row justify-between">
        <ChevronDoubleLeftIcon
          onClick={previous}
          className="cursor-pointer h-14 w-14 text-white  hover:text-blue-400"
        ></ChevronDoubleLeftIcon>
        <ChevronDoubleRightIcon
          onClick={next}
          className="cursor-pointer h-14 w-14 text-white hover:text-blue-400"
        ></ChevronDoubleRightIcon>
      </div>
      <RecommendedMovies />
    </div>
  );
}
