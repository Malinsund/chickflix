"use client";

import Bookmark from "@/app/UI/bookmark";
import movies from "../../../movies.json";
import Image from "next/image";

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
    <div>
      <h1 className="text-white">{selectedMovie.title}</h1>
      <Image
        src={selectedMovie.thumbnail}
        alt={`Thumbnail for ${selectedMovie.title}`}
        height={100}
        width={90}
      ></Image>

      <Bookmark movieTitle={selectedMovie.title} />
    </div>
  );
}
