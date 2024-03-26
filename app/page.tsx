"use client";

import Image from "next/image";
import Link from "next/link";
import movies from "../movies.json";
import Bookmark from "./UI/bookmark";
import RecommendedMovies from "./UI/Recommended";
import SearchBar from "./UI/searchbar";

export default function Home() {
  const filteredMovies = movies.filter((movie) => movie.isTrending === true);
  return (
    <div>
      <div>
        <SearchBar />
      </div>
      {filteredMovies.map((movie) => (
        <Link href={`/movie/${movie.title}`} key={movie.title}>
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
                  <Bookmark movieTitle={movie.title} />
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <RecommendedMovies />
    </div>
  );
}
