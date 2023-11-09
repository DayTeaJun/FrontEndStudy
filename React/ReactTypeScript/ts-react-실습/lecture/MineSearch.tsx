import * as React from "react";
import { useEffect, useRef, useMemo, Dispatch } from "react";

// 테이블 데이터 코드
export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 일반칸
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUSETION_MINE: -4, // 물음표인데, 지뢰이면
  FLAG_MINE: -5, // 깃발인데, 지뢰이면
  CLICKED_MINE: -6, // 지뢰를 클릭했다면
  OPENED: 0, // 주변 지뢰개수, 0 이상이면 다 opened
} as const; // 코드가 바뀔일 없으니 as const로 고정

// 중앙관리 contextAPI state 모음
interface ReducerState {
  tableData: number[][]; // 주변 지뢰 갯수나 깃발 등 데이터
  data: {
    // 가로 세로 지뢰갯수 설정
    row: number;
    cell: number;
    mine: number;
  };
  timer: number; // 지뢰찾기 시간 타이머
  result: string; // 결과
  halted: boolean; // 지뢰찾기 중지
  opendCount: number; // 승리조건
}

// 초기 세팅
const initialState: ReducerState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: "",
  halted: true,
  opendCount: 0,
};

// 지뢰심는 함수
const plantMine = (row: number, cell: number, mine: number) => {
  // 모든 칸을 배열로 만듦
  const candidate = Array(row * cell)
    .fill(undefined)
    .map((arr, i) => {
      return i;
    });
  // 숫자 섞기
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  // 지뢰개수만큼 뽑음
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData: number[] = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      // 지뢰 아닌 칸
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    // 지뢰 심기
    data[ver][hor] = CODE.MINE;
  }

  return data;
};
