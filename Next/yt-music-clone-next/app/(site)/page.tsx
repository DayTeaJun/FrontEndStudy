import { sleep } from '@/lib/utils';
import React from 'react';

// (site) 폴더는 경로가 설정되지 않음
// 폴더를 정리하는 용도로 그룹핑 가능
// 현재 경로가 없는 페이지

const page = async () => {
  await sleep(2000);

  // throw new Error('my error');
  // 에러 발생되는지 확인

  return <div>Home</div>;
};

export default page;
