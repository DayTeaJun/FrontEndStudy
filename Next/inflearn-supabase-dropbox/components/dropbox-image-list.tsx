"use client";

import { getImageUrl } from "@/utils/supabase/storage";
import { IconButton } from "@material-tailwind/react";

export default function DropboxImage({ image }) {
  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      <div>
        <img
          src={getImageUrl(image.name)}
          alt="dropbox"
          // aspect-square 은 이미지 사이즈 1대1 비율
          className="w-full aspect-square rounded-2xl"
        />
      </div>

      <div>{image.name}</div>

      <div className="absolute top-4 right-4">
        <IconButton onClick={() => {}} color="red">
          <i className="fas fa-trash"></i>
        </IconButton>
      </div>
    </div>
  );
}
