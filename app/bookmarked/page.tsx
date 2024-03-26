"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import movies from "../../movies.json";

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
      <h1 className="text-white text-3xl text-center">Bookmarked movies</h1>

      {bookmarkedMovies.length > 0 ? (
        bookmarkedMovies.map((movie) => (
          <React.Fragment key={movie.title}>
            <div className="bg-white bg-opacity-50 m-5 flex flex-col">
              <h2 className="text-white">{movie.title}</h2>
              <Image
                src={movie.thumbnail}
                alt={"Thumbnail for ${movie.title}"}
                width={100}
                height={100}
                layout="fixed"
              />
            </div>
          </React.Fragment>
        ))
      ) : (
        <p className="text-white">Du har inga bokmärkta filmer</p>
      )}
    </div>
  );
}
