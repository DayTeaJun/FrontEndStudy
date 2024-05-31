// loading 컴포넌트가 서버 사이드 렌더링되기 때문에 초기 상태만(움직이지 않는) 보임
// 클라이언트로 바꿔줘야함
// BarLoader는 내부적으로 useState를 쓰기 때문
// 정확히 말하면, BarLoader가 useState 리액트 클라이언트 사이드 렌더링에 포함되는 함수를 썻기 때문,
// 서버 사이드 렌더링에서 사용할려면 globalse.css에서 loading 관련 css 를 적고 연결시키면 사용 가능함.
'use client';
import React from 'react';
import { BarLoader } from 'react-spinners';

function LoadingBar() {
  // page에서 렌더링되는 동안 보여줄 컴포넌트
  return (
    <div className="w-full">
      {/* tailwind 가 안되는 외부 컴포넌트는 cssOverride 사용하여 객체 넘김 */}
      <BarLoader color="red" cssOverride={{ width: '100%' }} />
    </div>
  );
}

export default LoadingBar;
