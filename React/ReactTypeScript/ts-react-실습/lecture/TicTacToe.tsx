import * as React from "react";
import { useEffect, useCallback, useReducer } from "react";
import Table from "./Table";

interface ReducerState {
  // '' 빈문자열은 무승부
  winner: "O" | "X" | "";
  turn: "O" | "X";
  tableData: string[][];
  recentCell: [number, number];
}

// Reducer: 흩어져있던 state를 하나로 관리함
const initialState: ReducerState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

// state를 바꾸는 action
export const SET_WINNER = "SET_WINNER" as const;
export const CLICK_CELL = "CLICK_CELL" as const;
export const CHANGE_TURN = "CHANGE_TURN" as const;
export const RESET_GAME = "RESET_GAME" as const;

// action들은 객체로 이루어짐 그래서 타입을 지정함
interface SetWinnerAction {
  type: typeof SET_WINNER;
  winner: "O" | "X";
}

// action creater 변하는 값 winner 있어서 사용
const setWinner = (winner: "O" | "X"): SetWinnerAction => {
  return { type: SET_WINNER, winner };
};

interface ClickCellAction {
  type: typeof CLICK_CELL;
  row: number;
  cell: number;
}

// action creater 변하는 값 row, cell 있어서 사용 없는 경우는 사용하지 않음
const clickCell = (row: number, cell: number): ClickCellAction => {
  return { type: CLICK_CELL, row, cell };
};

interface ChageTurnAction {
  type: typeof CHANGE_TURN;
}

interface ResetGameAction {
  type: typeof RESET_GAME;
}

type ReducerActions =
  | SetWinnerAction
  | ClickCellAction
  | ChageTurnAction
  | ResetGameAction;

// state를 리턴하는 함수 (옛날 state를 action으로 새로운 state로 바꿔내는 함수)
const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    // 승자 설정
    case SET_WINNER:
      return {
        // state.winner = action.winner 는 안됨
        ...state,
        winner: action.winner,
      };
    // 칸 클릭
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    // 턴 변경
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    // state 초기화
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  // useState가 아닌 여러 state를 합친 useReducer
  // 타입추론이 잘 안될 경우 제네릭을 추가 (지금은 잘되기때문에 안넣어도 됨)
  const [state, dispatch] = useReducer<
    React.Reducer<ReducerState, ReducerActions>
  >(reducer, initialState); // state들은 여기서 다룬다.

  // 위에 선언한 state 안에서 구조분해할당으로 꺼내옴
  const { tableData, turn, winner, recentCell } = state;

  useEffect(() => {
    // 승자 가리는 useEffect
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    // 가로줄
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    // 세로줄
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    // 대각선
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true 무승부
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            // 하나라도 빈칸이면 아직 게임 안끝남
            all = false;
          }
        });
        if (all) {
          dispatch({ type: RESET_GAME });
        } else {
          dispatch({ type: CHANGE_TURN });
        }
      });
    }
  }, [recentCell]);

  // *useCallback 남용의 문제점:
  // 모든 함수를 useCallback으로 감싸게 되면
  // 컴포넌트가 리렌더 될 때 마다 모든 함수가 다시 재 생성 될 필요 있는지 검사하는 연산이 수행됩니다.
  // 따라서 보통은 특정 함수가 Props로 전달되어 불 필요한 컴포넌트 리렌더를 유발할 때에만 useCallback을 적용합니다.

  const onClickTable = useCallback(() => {
    // dispatch를 통해 state변경 (action)
    dispatch(setWinner("O"));
  }, []);

  return (
    <>
      <Table
        onClick={onClickTable}
        tableData={tableData}
        dispatch={dispatch}
      ></Table>
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
