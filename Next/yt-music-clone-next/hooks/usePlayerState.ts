import { dummyAllSongList } from '@/lib/dummyData';
import { Song } from '@/types';
import { create } from 'zustand';

interface PlayerState {
  isVisiblePlayer: boolean;
  setIsVisiblePlayer: (isVisiblePlayer: boolean) => void;
  activeSong?: Song | null;
  prevPlayerQueue: Song[];
  nextPlayerQueue: Song[];
  // 기능 (재생, 다음곡, 이전곡)
  addSongList: (songList: Song[]) => void; // 재생 버튼
  playNext: () => void; // 다음곡
  playBack: () => void; // 이전곡
}

const usePlayerState = create<PlayerState>((set) => ({
  isVisiblePlayer: true,
  setIsVisiblePlayer: (isVisiblePlayer: boolean) => set({ isVisiblePlayer }),
  activeSong: dummyAllSongList[0],
  prevPlayerQueue: [],
  nextPlayerQueue: [],
  addSongList: (songList: Song[]) =>
    // prev 이전상태의 값을 가져와서 다음상태를 리턴
    set((prev) => {
      const prevSong = prev.activeSong; // 현재 재생중인 노래
      const cloneSongList = [...songList];
      const currentSong = cloneSongList.splice(0, 1)?.[0]; // splice는 불변성이 유지가 되는 메서드가 아니기 때문에 현재 cloneSongList의 첫번째 요소가 사라진 상태.

      return {
        activeSong: currentSong,
        prevPlayerQueue: prevSong
          ? [prevSong, ...prev.prevPlayerQueue]
          : prev.prevPlayerQueue, // 현재 재생 중인 노래(prevSong)가 있으면 넣음.
        nextPlayerQueue: [...cloneSongList],
        isVisiblePlayer: true,
      };
    }),
  playNext: () =>
    set((prev) => {
      const currentSong = prev.activeSong;
      const nextSrc = prev.nextPlayerQueue.splice(0, 1)?.[0];
      return {
        activeSong: nextSrc, // 다음 플레이리스트에서의 첫번째 요소
        nextPlayerQueue: prev.nextPlayerQueue,
        prevPlayerQueue: [
          ...(currentSong ? [currentSong] : []),
          ...prev.prevPlayerQueue,
        ],
        // 현재 재생 중인 노래가 있으면 prevPlayerQueue에 넘김
      };
    }),
  playBack: () =>
    set((prev) => {
      const currentSong = prev.activeSong;
      const preSrc = prev.prevPlayerQueue.splice(0, 1)?.[0];

      return {
        activeSong: preSrc,
        nextPlayerQueue: [
          ...(currentSong ? [currentSong] : []),
          ...prev.prevPlayerQueue,
        ],
        prevPlayerQueue: prev.prevPlayerQueue,
      };
    }),
}));

export default usePlayerState;
