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
    <div className="bg-white bg-opacity-50 m-5 flex flex-col px-2 rounded-md">
      <h1 className="text-white text-center py-2 font-serif">{selectedMovie.title}</h1>
      <Image
        src={selectedMovie.thumbnail}
        alt={`Thumbnail for ${selectedMovie.title}`}
        height={100}
        width={90}
        style={{
          height: "100%",
          width: "auto",
        }}
      ></Image>
      <div className="flex flex-col p-2">
        <div className="flex flex-row justify-between">
          <p>{selectedMovie.year}</p>
          <div className="flex flex-row">
            <p>{selectedMovie.rating}</p>
            <Bookmark movieTitle={selectedMovie.title} />
          </div>
        </div>
        <hr className="bg-[#282525] my-3"/>
        <p>{selectedMovie.synopsis}</p>
        <p>Genre: {selectedMovie.genre}</p>
        <p>Starring: {selectedMovie.actors.join(", ")}</p>
      </div>
    </div>
  );
}
