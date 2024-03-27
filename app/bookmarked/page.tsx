"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import movies from "../../movies.json";
import Bookmark from "../UI/bookmark";

type Movie = {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
};

export default function Bookmarked() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const bookmarkedTitles = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );

    const bookmarked = movies.filter((movie) =>
      bookmarkedTitles.includes(movie.title)
    );
    setBookmarkedMovies(bookmarked);
  }, []);

  return (
    <div className="text-center text-3xl text-white pt-8">
      <h1>Bookmarked movies</h1>
      {bookmarkedMovies.length > 0 ? (
        <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4">
          {bookmarkedMovies.map((movie) => (
            <div
              key={movie.title}
              className="m-5 flex flex-col items-center bg-white bg-opacity-50 rounded shadow-lg overflow-hidden max-w-xs md:max-w-none  lg:w-1/4 xl:w-1/5"
            >
              <Image
                src={movie.thumbnail}
                alt={`Thumbnail for ${movie.title}`}
                width={350}
                height={500}
                layout="fixed"
                className="rounded"
              />
              <h2 className="text-black text-lg font-semibold p-2">
                {movie.title}
              </h2>
              <Bookmark movieTitle={movie.title} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-white mt-20 text-lg">
            You have no bookmarked movies
          </p>
        </div>
      )}
    </div>
  );
}
