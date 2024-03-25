"use client";

import Image from "next/image";
import movies from "../movies.json";

export default function Home() {
  return (
    <div>
      {movies.map((movie) => (
        <div
          className="bg-white bg-opacity-50 m-5 flex flex-col"
          key={movie.title}
        >
          <Image
            src={movie.thumbnail}
            height={100}
            width={100}
            alt={movie.title}
          ></Image>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}
