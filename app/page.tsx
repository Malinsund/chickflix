"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import movies from "../movies.json";

// Function to convert a movie title to a slug (e.g., "The Great Escape" -> "the-great-escape")

export default function Home() {
  return (
    <div>
      {movies.map((movie) => (
        <div
          className="bg-white bg-opacity-50 m-5 flex flex-col"
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
                <BookmarkIcon className="text-white h-7 w-7" />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
