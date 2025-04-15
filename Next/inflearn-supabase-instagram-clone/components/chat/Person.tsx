"use client";

import { getRandomImage } from "@/utils/random";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko.json";

TimeAgo.addDefaultLocale(ko);

// 시간 포멧 간단 설정 라이브러리
const timeAgo = new TimeAgo("ko-KR");

export default function Person({
  index,
  userId,
  name,
  onlineAt,
  onChatScreen = false,
  isActive = false,
  onClick = null,
}) {
  return (
    <div
      className={`gap-4 w-full min-w-60 ${
        onClick && "cursor-pointer"
      } flex items-center p-4 ${!onChatScreen && isActive && "bg-light-blue-50"}
       ${!onChatScreen && !isActive && "bg-gray-50"}  
      ${onChatScreen && "bg-gray-50"}`}
      onClick={onClick}
    >
      <img
        src={getRandomImage(index)}
        alt={name}
        className="w-10 h-10 rounded-full"
      />

      <div>
        <p className="text-black font-bold text-lg">{name}</p>
        <p className="text-gray-500 text-sm">
          {onlineAt && timeAgo.format(Date.parse(onlineAt))}
        </p>
      </div>
    </div>
  );
}
