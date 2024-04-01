import RecommendedMovies from "./UI/Recommended";
import RecommendedBigScreen from "./UI/RecommendedBigScreen";
import TrendingMoviesBigScreen from "./UI/TrendingBigScreen";
import TrendingMoviesMobile from "./UI/TrendingMobile";
import SearchBar from "./UI/searchbar";
import "./global.css";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <TrendingMoviesMobile />
      <TrendingMoviesBigScreen />
      <RecommendedMovies />
      <RecommendedBigScreen />
    </div>
  );
}
