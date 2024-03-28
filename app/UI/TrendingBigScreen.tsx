"use client"

import Image from "next/image";
import Link from "next/link";
import movies from "../../movies.json";
import Bookmark from "./bookmark";

export default function TrendingMoviesBigScreen() { 
    const filteredMovies = movies.filter((movie) => movie.isTrending === true);

    return (
        <div className="hidden grid-cols-2 justify-center gap-7 sm:hidden md:grid lg:grid-cols-3">
 {filteredMovies.map((movie) => (
        <Link href={`/movie/${movie.title}`} key={movie.title}>
             
          <div
          /* eslint-disable-next-line tailwindcss/migration-from-tailwind-2, tailwindcss/no-custom-classname */
            className="flex h-full flex-col justify-between rounded-md bg-white bg-opacity-50"
            key={movie.title}
          >
            <h3 className="p-3 text-center font-bold">{movie.title}</h3>
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
      </div>
    )
}