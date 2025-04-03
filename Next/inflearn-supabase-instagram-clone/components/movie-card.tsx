"use client";

import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    // span 1 차지
    <div className="col-span-1 relative">
      {/* img */}
      <img src={movie.image_url} alt="" className="w-full" />

      {/* title dim */}
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black hover:opacity-80 opacity-0 transition-opacity duration-300">
          <p className="font-bold text-white text-xl">{movie.title}</p>
        </div>
      </Link>
    </div>
  );
}
