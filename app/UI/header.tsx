import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-[#282525] flex justify-between p-4">
      <h1 className="text-blue-400">Chick Flix</h1>

      <BookmarkIcon className="text-white h-7 w-7" />
    </header>
  );
}
