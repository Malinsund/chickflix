import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#282525] flex justify-between p-4">
      <Link href="/">
        <h1 className="text-blue-400">Chick Flix</h1>
      </Link>
      <BookmarkIcon className="text-white h-7 w-7" />
    </header>
  );
}
