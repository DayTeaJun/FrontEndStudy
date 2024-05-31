import React from 'react';
import { IoIosPlayCircle } from 'react-icons/io';

function PlaylistNav({ playlist }) {
  const { id, owner, palylistName, songList } = playlist;

  return (
    <li>
      {owner}
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div>
          <IoIosPlayCircle size={24} />
        </div>
      </div>
    </li>
  );
}

export default PlaylistNav;
