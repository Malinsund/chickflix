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
  return decodeURIComponent(slug).replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
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
    <div className="bg-white bg-opacity-50 m-5 flex flex-col px-2 rounded-md text-black">
      <p className="text-center py-3 font-bold text-xl">{selectedMovie.title}</p>
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
      <div className="bg-blue-300 overflow-hidden rounded-b-md">
      <p className="font-bold py-1"><span className="rolling-text">Trending right now!</span></p>
      </div>
        )}
      <div className="flex flex-col p-2 gap-5">
        <div>
        <div className="flex flex-row justify-between">
          <p className="font-semibold flex items-center justify-center text-lg">{selectedMovie.year}</p>
          <div className="flex flex-row">
            {selectedMovie.rating !== "Not Rated" && (
              <p className="bg-white h-7 w-7 rounded-full flex items-center justify-center mr-1  font-bold">{selectedMovie.rating}</p>
            )}
            <Bookmark movieTitle={selectedMovie.title} />
          </div>
        </div>
        <hr className="bg-[#282525] my-3"/>
        <p>{selectedMovie.synopsis}</p>
        </div>

        <div className="italic text-sm">
        <p>Genre: <span className="font-thin">{selectedMovie.genre}</span></p>
        <p>Starring: <span className="font-thin">{selectedMovie.actors.join(", ")}</span></p>
        </div>
      </div>
    </div>
  );
}
