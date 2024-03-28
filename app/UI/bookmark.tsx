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
    const index = bookmarkedMovies.indexOf(movieTitle);

    if (index !== -1) {
      /* Tar bort */
      bookmarkedMovies.splice(index, 1);
    } else {
      /* Lägger till */
      bookmarkedMovies.push(movieTitle);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedMovies));
    setIsBookmarked(!isBookmarked);

    window.dispatchEvent(
      new CustomEvent("bookmarkChanged", { detail: movieTitle })
    );
  };

  return (
    <button onClick={toggleBookmark}>
      {isBookmarked ? (
        <SolidBookmarkIcon className="size-6 text-blue-400" />
      ) : (
        <OutlineBookmarkIcon className="size-6 text-blue-400" />
      )}
    </button>
  );
};

export default Bookmark;
