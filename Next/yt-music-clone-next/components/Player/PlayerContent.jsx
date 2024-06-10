import React, { useCallback, useEffect } from 'react';
import { Slider as PlayerSlider } from '@/components/ui/playerSlider';
import { useAudio } from 'react-use';
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoShuffle,
  IoVolumeHighOutline,
} from 'react-icons/io5';
import { AiFillCaretUp, AiOutlinePause } from 'react-icons/ai';
import usePlayerState from '@/hooks/usePlayerState';
import { ClipLoader } from 'react-spinners';
import { RiPlayFill } from 'react-icons/ri';
import Image from 'next/image';
import { RxLoop } from 'react-icons/rx';

function PlayerContent() {
  const { activeSong, prevPlayerQueue, nextPlayerQueue, playBack, playNext } =
    usePlayerState();

  const [audio, state, controls, ref] = useAudio({
    src: activeSong?.src,
    autoPlay: true,
  });

  const isLoading = activeSong?.src && state.buffered?.length === 0;
  // useAudio 내장함수 buffered
  // 로딩 상태

  const onClickPrevBtn = () => {
    if (state.playing && state.time > 10) {
      // 뒤로가기 버튼을 눌렀을 때, 10이상 재생되었다면 초기화
      controls.seek(0);
      return;
    }
    // 이전 노래가 없다면 아무것도 하지 않음
    if (prevPlayerQueue.length === 0) {
      return;
    }
    // 이전 노래가 있다면 뒤로 감
    playBack();
  };

  const onClickStartBtn = () => {
    // 현재 재생중인 노래가 있다면 재생
    if (activeSong) {
      controls.play();
      // useAudio 내장함수
    } else {
      // 없다면 다음 노래
      playNext();
    }
  };

  const onClickPauseBtn = () => {
    controls.pause();
    // useAudio 내장함수
  };

  // useEffect에서 사용되면 자주 재생성이 되므로,
  // 불필요 함수 재생성 방지, 의존성 배열이 변경되면 재생성
  const onClickNextBtn = useCallback(() => {
    // 다음 노래가 있지 않다면 재생 멈춤
    if (nextPlayerQueue.length === 0) {
      controls.pause();
    } else {
      // 있다면 다음 노래로 넘김
      playNext();
    }
  }, [controls, playNext, nextPlayerQueue]);

  useEffect(() => {
    const refAudio = ref.current;
    // ended 는 노래의 재생이 끝났는지 알 수 있음
    // refAudio의 ended 라는 이벤트 발생시 다음곡으로 넘김
    refAudio.addEventListener('ended', onClickNextBtn);
    return () => {
      refAudio.removeEventListener('ended', onClickNextBtn);
    };
    // ref 는 audio 참조중
  }, [ref, onClickNextBtn]);

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-[-16px] w-full">
        <PlayerSlider
          className="w-full"
          defaultValue={[0]}
          value={[state.time]}
          onValueChange={(value) => {
            controls.seek(value);
          }}
          max={state.duration}
        />
      </div>
      {audio}
      <section className="flex flex-row justify-between items-center w-full h-full px-2 lg:px-6">
        <div className="h-full flex flex-row  items-center gap-1 lg:gap-8">
          <IoPlaySkipBackSharp
            size={24}
            className="cursor-pointer"
            onClick={onClickPrevBtn}
          />
          {isLoading ? (
            <ClipLoader color="#FFF" />
          ) : state.playing ? (
            <AiOutlinePause
              size={40}
              classNe="cursor-pointer"
              onClick={onClickPauseBtn}
            />
          ) : (
            <RiPlayFill
              size={40}
              classNe="cursor-pointer"
              onClick={onClickStartBtn}
            />
          )}

          <IoPlaySkipForwardSharp
            size={24}
            className="cursor-pointer"
            onClick={onClickNextBtn}
          />
        </div>
        <article>
          <div className="flex flex-row gap-4 items-center">
            <div className=" relative w-[40px] h-[40px] flex">
              <Image
                fill
                className="object-cover"
                src={activeSong?.imageSrc}
                alt="img"
              />
            </div>
            <div className="flex flex-col">
              <div>{activeSong?.name}</div>
              <div className=" text-neutral-500 text-[14px]">
                {activeSong?.channel} - 조회수 7.8만회 - 좋아요 1.7천개
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className=" flex-row gap-2 hidden lg:flex">
                <IoVolumeHighOutline size={24} className=" cursor-pointer" />
                <IoShuffle size={24} className=" cursor-pointer" />
                <RxLoop size={24} className=" cursor-pointer" />
              </div>
              <div>
                <AiFillCaretUp size={24} className=" cursor-pointer" />
              </div>
            </div>
          </div>
        </article>
        <div></div>
      </section>
    </div>
  );
}

export default PlayerContent;
