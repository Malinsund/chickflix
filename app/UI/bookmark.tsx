import { useEffect, useState } from "react";

import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";

interface BookmarkProps {
  movieTitle: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ movieTitle }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarkedMovies = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    setIsBookmarked(bookmarkedMovies.includes(movieTitle));
  }, [movieTitle]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    let bookmarkedMovies = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    if (bookmarkedMovies.includes(movieTitle)) {
      bookmarkedMovies = bookmarkedMovies.filter(
        (title: string) => title !== movieTitle
      );
    } else {
      bookmarkedMovies.push(movieTitle);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedMovies));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button onClick={toggleBookmark}>
      {isBookmarked ? (
        <SolidBookmarkIcon className="h-6 w-6 text-blue-400" />
      ) : (
        <OutlineBookmarkIcon className="h-6 w-6 text-blue-400" />
      )}
    </button>
  );
};

export default Bookmark;
