import RecommendedMovies from "./UI/Recommended";
import TrendingMovies from "./UI/Trending";
import SearchBar from "./UI/searchbar";
import "./global.css";

export default function Home() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <h1 className="text-center text-white">Trending right now</h1>

      <TrendingMovies />
      <RecommendedMovies />
    </div>
  );
}
