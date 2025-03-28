"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={50}
        height={30}
        src="/images/dropbox_icon.png"
        alt="dropbox"
        className="!w-8 !h-auto"
      />
      <span className="text-xl font-bold">Minibox</span>
    </div>
  );
}
