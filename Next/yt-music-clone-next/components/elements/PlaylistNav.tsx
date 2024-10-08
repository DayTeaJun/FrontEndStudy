'use client';
import usePlayerState from '@/hooks/usePlayerState';
import React from 'react';
import { IoIosPlayCircle } from 'react-icons/io';

function PlaylistNav({ playlist }) {
  const { addSongList } = usePlayerState();

  const { id, owner, playlistName, songList } = playlist;

  const onClickPlay = () => {
    addSongList(songList);
  };

  return (
    <li className="mx-3 px-4 h-[56px] flex flex-row justify-between items-center hover:bg-neutral-700 rounded-lg group">
      {/* group은 하위 컨텐츠와 묶어줄 수 있음 */}
      <div>
        <div className="text-[14px]">{playlistName}</div>
        <div className="text-[12px] text-neutral-500">{owner}</div>
      </div>
      <div>
        <div
          onClick={onClickPlay}
          className="hidden group-hover:block cursor-pointer"
        >
          <IoIosPlayCircle size={30} />
        </div>
      </div>
    </li>
  );
}

export default PlaylistNav;
