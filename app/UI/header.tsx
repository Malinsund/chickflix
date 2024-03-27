import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between bg-[#282525] p-4">
      <Link href="/">
        <h1 className=" text-blue-400 ">Chick Flix</h1>
      </Link>

      <Link href="/bookmarked">
        <BookmarkIcon className="size-7 text-white" />
      </Link>
    </header>
  );
}
