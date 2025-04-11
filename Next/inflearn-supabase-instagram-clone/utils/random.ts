// 랜덤한 이미지 URL을 생성하는 함수, 해당 경로에 이미지
export const getRandomImage = (index: number) => {
  return `https://randomuser.me/api/portraits/med/men/${index}.jpg`;
};
