"use client";

import Link from "next/link";

export default function MovieCard() {
  return (
    // span 1 차지
    <div className="col-span-1 relative">
      {/* img */}
      <img
        src="https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
        alt=""
        className="w-full"
      />

      {/* title dim */}
      <Link href="/movies/1">
        <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black hover:opacity-80 opacity-0 transition-opacity duration-300">
          <p className="font-bold text-white text-xl">Dune: Part Two</p>
        </div>
      </Link>
    </div>
  );
}
