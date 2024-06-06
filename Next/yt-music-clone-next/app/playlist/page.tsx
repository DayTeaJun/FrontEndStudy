import { getPlaylistById } from '@/lib/dummyData';
import { getRandomElementFromArray } from '@/lib/utils';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import HeaderBgChanger from '@/components/HeaderBgChanger';
import PagePadding from '@/components/PagePadding';
import PlaylistHead from '@/components/PlaylistHead';
import SongCardRowExtend from '@/components/SongCardRowExtend';

interface PlaylistPageProps {
  searchParams: {
    list: string;
  };
}

const page = async (props: PlaylistPageProps) => {
  // 현재 컴포넌트가 SSR 인 상태이면 웹페이지 콘솔에 찍히지 않고, 아래 터미널에서 확인가능
  // 서버사이드에서 만들고 보내기 때문.
  // console.log('props', props);

  const playlist = await getPlaylistById(Number(props.searchParams.list));

  if (!playlist) {
    // 서버 컴포넌트에서 작업하면 redirect 사용
    // 클라이언트 컴포넌트면 useRouter 같은 hook 계열 사용
    permanentRedirect('/');
  }

  const imageSrc = getRandomElementFromArray(playlist.songList).imageSrc;

  return (
    <PagePadding>
      <HeaderBgChanger imageSrc={imageSrc} />
      <div className="mt-12"></div>
      <PlaylistHead playlist={playlist} />
      <div className="mt-12"></div>
      <section className="flex flex-col gap-2">
        {playlist.songList.map((song, idx) => {
          return <SongCardRowExtend song={song} key={idx} />;
        })}
      </section>
    </PagePadding>
  );
};

export default page;
