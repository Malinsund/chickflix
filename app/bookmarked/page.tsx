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
    const handleBookmarkChange = () => {
      const bookmarkedTitles = JSON.parse(
        localStorage.getItem("bookmarks") || "[]"
      );
      const updatedBookmarkedMovies = movies.filter((movie) =>
        bookmarkedTitles.includes(movie.title)
      );
      setBookmarkedMovies(updatedBookmarkedMovies);
    };
    handleBookmarkChange();
    window.addEventListener("bookmarkChanged", handleBookmarkChange);
    return () => {
      window.removeEventListener("bookmarkChanged", handleBookmarkChange);
    };
  }, []);

  return (
    <div className="text-center text-3xl text-white pt-8">
      <h1>Bookmarked movies</h1>
      {bookmarkedMovies.length > 0 ? (
        <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4">
          {bookmarkedMovies.map((movie) => (
            <div
              key={movie.title}
              className="m-5 flex flex-col items-center bg-white bg-opacity-50 rounded shadow-lg overflow-hidden max-w-xs md:max-w-none lg:w-1/4 xl:w-1/5"
            >
              <Image
                src={movie.thumbnail}
                alt={`Thumbnail for ${movie.title}`}
                width={100}
                height={100}
                layout="fixed"
                className="rounded"
                style={{
                  height: "100%",
                  width: "400px",
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  paddingTop: "10px",
                }}
              ></Image>
              <div className="flex flex-row justify-between p-5">
                <h3 className="text-black text-lg font-bold">{movie.title}</h3>
                <div className="pl-4">
                  <Bookmark movieTitle={movie.title} />
                </div>
              </div>
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
