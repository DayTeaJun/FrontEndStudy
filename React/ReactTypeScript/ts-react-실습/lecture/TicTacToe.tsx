import * as React from "react";
import { useEffect, useCallback, useReducer, Reducer } from "react";
import Table from "./Table";

interface ReducerState {
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

export const SET_WINNER = "SET_WINNER" as const;
export const CLICK_CELL = "CLICK_CELL" as const;
export const CHANGE_TURN = "CHANGE_TURN" as const;
export const RESET_GAME = "RESET_GAME" as const;

interface SetWinnerAction {
  type: typeof SET_WINNER;
  winner: "O" | "X";
}

const setWinner = (winner: "O" | "X"): SetWinnerAction => {
  return { type: SET_WINNER, winner };
};

interface ClickCellAction {
  type: typeof CLICK_CELL;
  row: number;
  cell: number;
}

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

const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...StaticRange,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...StaticRange.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  const onClickTable = useCallback(() => {
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
