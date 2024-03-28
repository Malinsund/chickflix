"use client";

import Bookmark from "@/app/UI/bookmark";
import Image from "next/image";
import movies from "../../../movies.json";

type Movie = {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
};

//gör slug till title
function slugToTitle(slug: string): string {
  //gör om %20 (mellanslag) till nada
  return decodeURIComponent(slug);
}

type PageProps = { params: { slug: string } };

export default function MoviePage({ params }: PageProps) {
  const slug = params.slug;
  const titleFromSlug = slugToTitle(slug);
  const selectedMovie = movies.find(
    (movie: Movie) => movie.title === titleFromSlug
  );

  if (!selectedMovie) {
    return (
      <div>
        <h1 className="text-white">404</h1>
        <p className="text-white">Movie does not exit</p>
      </div>
    );
  }
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="m-5 flex flex-col rounded-md bg-white bg-opacity-50 px-2 text-black">
      <p className="py-3 text-center text-xl font-bold md:hidden">
        {selectedMovie.title}
      </p>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col px-2 py-6 md:w-1/3">
          <Image
            src={selectedMovie.thumbnail}
            alt={`Thumbnail for ${selectedMovie.title}`}
            height={100}
            width={90}
            style={{
              height: "100%",
              width: "auto",
              borderRadius: "6px 6px 0px 0px",
            }}
          ></Image>
          {selectedMovie.isTrending === true && (
            <div className="overflow-hidden rounded-b-md bg-blue-300">
              <p className="py-1 font-bold">
                <span className="rolling-text">Trending right now!</span>
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between p-2">
          <div className="grow">
            <p className="py-3 text-center text-xl font-bold">
              {selectedMovie.title}
            </p>
            <div className="flex flex-row justify-between">
              <p className="flex items-center justify-center text-lg font-semibold">
                {selectedMovie.year}
              </p>
              <div className="flex flex-row">
                {selectedMovie.rating !== "Not Rated" && (
                  <p className="mr-1 flex size-9 items-center justify-center rounded-full bg-white font-bold text-xs">
                    {selectedMovie.rating}
                  </p>
                )}
                <Bookmark movieTitle={selectedMovie.title} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <hr className="my-3 bg-[#282525]" />
              <p className="font-semibold">About:</p>
              <p className="md:w-4/5">{selectedMovie.synopsis}</p>
            </div>
          </div>

          <div className="py-4 text-sm italic font-semibold">
            <p>
              Genre: <span className="font-thin">{selectedMovie.genre}</span>
            </p>
            <p>
              Starring:{" "}
              <span className="font-thin">
                {selectedMovie.actors.join(", ")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
