import Box from "./Box";

interface GridProps {
  cols: number; // Number of columns
  rows: number; // Number of rows
  fullGrid: boolean[][]; // A 2D array of booleans
  selectBox: (row: number, col: number) => void; // A function that takes row and col as arguments
}

export default function Grid({ cols, rows, fullGrid, selectBox }: GridProps) {
  const width = cols * 14.49;
  const rowsArr = [];
  let boxClass = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const boxId = i + "_" + j;
      boxClass = fullGrid[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          row={i}
          col={j}
          boxId={boxId}
          selectBox={selectBox}
        />
      );
    }
  }
  return (
    <div className="grid" style={{ width: width }}>
      {rowsArr}
    </div>
  );
}
