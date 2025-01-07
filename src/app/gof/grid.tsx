import Box from "./Box";
import styled from "styled-components";

interface GridProps {
  cols: number; // Number of columns
  rows: number; // Number of rows
  fullGrid: boolean[][]; // A 2D array of booleans
  selectBox: (row: number, col: number) => void; // A function that takes row and col as arguments
  cellSize: number;
  deadColor: string;
  liveColor: string;
}

const StyledGrid = styled.div<{ width: number }>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => `${props.width}px` || "150px"};
  line-height: 0;
  margin: auto;
  box-shadow: 0px 0px 20px white;
  margin-top: 20px;
`;
export default function Grid({
  cols,
  rows,
  fullGrid,
  selectBox,
  cellSize,
  liveColor,
  deadColor,
}: GridProps) {
  const width = cols * (cellSize - 1);
  const rowsArr = [];
  let boxClass = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const boxId = i + "_" + j;
      boxClass = fullGrid[i][j] ? "on" : "off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          row={i}
          col={j}
          boxId={boxId}
          selectBox={selectBox}
          cellSize={cellSize}
          liveColor={liveColor}
          deadColor={deadColor}
        />
      );
    }
  }
  return <StyledGrid width={width}>{rowsArr}</StyledGrid>;
}
