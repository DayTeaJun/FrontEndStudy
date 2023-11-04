import * as React from "react";
import { useMemo, useState, useRef, useCallback } from "react";

function getWinNumbers() {
  // 타입스크립트에는 fill()할때, null을 넣어야 에러가 안남
  const candidate = Array(45)
    .fill(null)
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // 매번 렌더링될때마다 다시 초기화되기 때문에 useMemo 사용 (useMemo는 타입추론이 잘 되어있다 <number[]>)
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  // 빈 배열은 타입 추론 가능하게 리턴값을 넣는다.
  const [winBalls, setWinBalls] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [redo, setRedo] = useState(false);
  // 빈 배열은 타입 추론 가능하게 리턴값을 넣는다.
  const timeouts = useRef<number[]>([]);

  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
};
