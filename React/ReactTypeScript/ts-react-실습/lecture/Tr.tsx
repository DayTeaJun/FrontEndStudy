import * as React from "react";
import { Dispatch, FC, useMemo } from "react";
import Td from "./Td";

interface Props {
  rowData: string[];
  rowIndex: number;
  dispatch: Dispatch<any>;
}
const Tr: FC<Props> = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill(null)
        .map((td, i) =>
          useMemo(
            () => (
              <Td
                key={i}
                dispatch={dispatch}
                rowIndex={rowIndex}
                cellIndex={i}
                cellData={rowData[i]}
              >
                {/* 컴포넌트 사이에 들어있는 데이터도 Props children으로 넘겨준다. */}
                {""}
              </Td>
            ),
            [rowData[i]]
          )
        )}
    </tr>
  );
};

export default Tr;
