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
    <div>
      <h1 className="text-center text-3xl text-white">Bookmarked movies</h1>

      {bookmarkedMovies.length > 0 ? (
        bookmarkedMovies.map((movie) => (
          <React.Fragment key={movie.title}>
            {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
            <div className="m-5 flex flex-col bg-white bg-opacity-50">
              <h2 className="text-white">{movie.title}</h2>
              <Image
                src={movie.thumbnail}
                alt={"Thumbnail for ${movie.title}"}
                width={100}
                height={100}
                layout="fixed"
              />
              <Bookmark movieTitle={movie.title} />
            </div>
          </React.Fragment>
        ))
      ) : (
        <p className="text-white">You have no bookmarked movies</p>
      )}
    </div>
  );
}
