import Image from 'next/image';
import React from 'react';

function Header({ children }) {
  return (
    <header className="relative overflow-y-auto w-full h-full">
      <section className="absolute top-0 w-full">
        <div className="relative h-[400px] w-full">
          {/* Image 화면을 채우기 위해 부모에게 relative주고 fill 속성을 주면된다. */}
          <Image
            alt="mediaItem"
            className="object-cover"
            fill
            src="https://images.unsplash.com/photo-1707833558984-3293e794031c"
          />
          <div className="absolute h-[400px] top-0 bg-black opacity-40 w-full"></div>
          <div className="absolute h-[400px] top-0 bg-gradient-to-t from-black opacity-40 w-full"></div>
        </div>
      </section>
      <section className="absolute">{children}</section>
    </header>
  );
}

export default Header;
