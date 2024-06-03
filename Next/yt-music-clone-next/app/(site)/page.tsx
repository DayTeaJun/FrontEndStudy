import React from 'react';
import Category from './components/Category';
import PagePadding from '@/components/PagePadding';
import PlayListCarousel from '@/components/PlayListCarousel';
import { dummyPlaylistArray } from '@/lib/dummyData';
import UserIcon from '@/components/UserIcon';

// (site) 폴더는 경로가 설정되지 않음
// 폴더를 정리하는 용도로 그룹핑 가능
// 현재 경로가 없는 페이지

const page = async () => {
  // await sleep(2000);

  // throw new Error('my error');
  // 에러 발생되는지 확인

  // console.log('before home');
  // await sleep(4000);
  // console.log('after home');
  // root가 4초, 홈에서 2초가 로딩된다면, 사용자는 4초 후에 페이지가 보이게 될 것이고,
  // root가 2초, 홈에서 4초라면 사용자는 2초 후에 페이지가 보이고, 2초 동안 페이지가 로딩되는 것을 볼 수 있다.
  // 사용자에게 좋은 경험을 주는 것은 root를 제외한 다른 페이지에서 데이터를 불러오는게 좋다.

  const dummyPlaylistArray1 = [...dummyPlaylistArray];

  return (
    <PagePadding>
      <div className="min-h-[600px]">
        <div className="mt-9"></div>
        <Category />
        <div className="mt-12"></div>
        <PlayListCarousel
          playlistArray={[...dummyPlaylistArray1]}
          Thumbnail={
            <div className="w-[56px] h-[56px]">
              <UserIcon size={'lg'} />
            </div>
          }
          title="다시 듣기"
          subTitle="도도"
        />
      </div>
    </PagePadding>
  );
};

export default page;
