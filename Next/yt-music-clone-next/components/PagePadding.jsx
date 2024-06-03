import React from 'react';

function PagePadding({ children }) {
  return (
    // lg(1024px) 이 넘게 되면 px값을 100px 변화
    <div className="mx-auto px-[10px] py-2 lg:px-[100px]">{children}</div>
  );
}

// 반응형 tailwind 참고 : tailwind css responsive

export default PagePadding;
