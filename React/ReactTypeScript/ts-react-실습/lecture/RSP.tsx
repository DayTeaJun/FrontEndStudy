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
  // 제네릭<imgCoords>으로 타입추론을 제대로 해준다. 제네릭을 넣지않으면 기본값(이때는 rspCoords.바위)으로 타입이됨
  const [imgCoord, setImgCoord] = useState<imgCoords>(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef<number>();

  useEffect(() => {
    console.log("다시 실행");
    // setInterval 이 nodeJS에서 실행된다고 기본값이 되어있어 웹으로 실행하는 window로 붙여줘야함
    interval.current = window.setInterval(changeHand, 100);
    return () => {
      console.log("종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    // 위 useState의 제네릭을 넣어 타입추론을 가능하게 해줌
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  // JSX에서 인자를 넣어 함수를 실행할 때, 호출이 한번 들어가면 고차함수로 작성
  const onClickBtn = (choice: keyof typeof rspCoords) => () => {
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
      interval.current = window.setInterval(changeHand, 100);
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
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </div>
    </>
  );
};

export default RSP;
