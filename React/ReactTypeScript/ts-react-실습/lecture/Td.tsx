import * as React from "react";
import { Dispatch, FC, useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

interface Props {
  rowIndex: number;
  cellIndex: number;
  dispatch: Dispatch<any>;
  cellData: string;
  children: string;
}

const Td: FC<Props> = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    // 이미 색칠된 칸이면 진행하지 않고 return 시킨다.
    if (cellData) {
      return;
    }
    // 칸을 클릭 했을 때, 이벤트를 발생시키고 (useState처럼)
    // 최상단 부모에서 맨 밑의 자식까지 넘겨준 dispatch는 contextAPI가 더 좋다
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
