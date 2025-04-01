"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/">
        {/* next/image 의 경우 width, height가 필수값인데, 이유는 페이지 렌더링 될 때 미리 크기 값을 지정하지 않으면 차지할 공간에 따른 계산 시간이 더 걸리게 됨, 또한 layout shift 방지*/}
        <Image
          src="/images/tmdbflix_logo.png"
          alt=""
          width={50}
          height={30}
          className="!w-20 !h-auto"
        />
      </Link>
    </div>
  );
}
