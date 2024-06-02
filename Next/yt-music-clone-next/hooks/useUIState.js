import { create } from 'zustand';

const useUIState = create((set) => ({
  // 초기 설정
  homeCategory: '',
  headerImageSrc:
    'https://images.unsplash.com/photo-1707833558984-3293e794031c',

  // 외부 값을 받아서 값을 변경
  setHomeCategory: (value) => set({ homeCategory: value }),
  setHeaderImageSrc: (src) => set({ headerImageSrc: src }),
}));

export default useUIState;
