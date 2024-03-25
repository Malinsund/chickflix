import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-[#282525] flex justify-between">
      <h1 className="text-blue-800">Chick Flix</h1>
      {/* <span>💜</span> */}

      <BookmarkIcon />
    </header>
  );
}
