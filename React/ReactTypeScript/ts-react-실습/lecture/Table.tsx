import * as React from "react";
import { useMemo, FC, Dispatch } from "react";
import Tr from "./Tr";

interface Props {
  tableData: string[][];
  // Dispatch 타입을 정확하게 준다면 어떤 action(SET_WINNER, ...)을 주는지 적으면 됨, 크게 문제는 없음
  dispatch: Dispatch<any>;
  onClick: () => void;
}

const Table: FC<Props> = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length)
        .fill(null)
        .map((tr, i) =>
          // 캐싱을 하기위한 useMemo
          useMemo(
            () => (
              <Tr
                key={i}
                dispatch={dispatch}
                rowIndex={i}
                rowData={tableData[i]}
              />
            ),
            [tableData[i]]
          )
        )}
    </table>
  );
};

export default Table;
