import * as React from "react";
import { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
} as const;

// 아래 값은 바뀔일이 없으므로 as const로 readonly 값 고정
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
} as const;

// 해당 타입을 불러오고
type a = typeof rspCoords;
// 해당 타입의 키를 불러옴
type a1 = keyof typeof rspCoords;
// 해당 타입의 값을 불러옴
type imgCoords = (typeof rspCoords)[keyof typeof rspCoords];
// type imgCoords = "0" | "-142px" | "-284px"

const computerChoice = (imgCoords: imgCoords) => {
  // Object.keys 의 리턴값은 string이라고 기본값으로 되어있음 그래서 강제 형변환 as 해줘야함 (위의 rspCoords의 타입을 as const로 바위, 가위, 보 로 고정했기 때문)
  return (Object.keys(rspCoords) as ["바위", "가위", "보"]).find((k) => {
    return rspCoords[k] === imgCoords;
  })!;
  // computerChoice 함수의 리턴 값에서 타입스크립트가 undefined도 추론을 하기 때문에, 사실 이 함수에서 undefined 나올 일은 없으므로 끝에 '!' 붙여 undefined가 나오지 않는다는 것을 확인 시킨다.
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef<number>();

  useEffect(() => {
    console.log("다시 실행");
    interval.current = setInterval(changeHand, 100);
    return () => {
      console.log("종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = () => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다");
      setScore((prev) => prev + 1);
    } else {
      setResult("졌습니다");
      setScore((prev) => prev - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onclick("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onclick("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onclick("보")}>
          보
        </button>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </div>
    </>
  );
};

export default RSP;
