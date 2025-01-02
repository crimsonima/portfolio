interface BoxProps {
  boxClass: string; // Class name for styling the box
  key: string | number; // Key for React (could be string or number)
  row: number; // Row index
  col: number; // Column index
  boxId: string; // Unique identifier for the box
  selectBox: (row: number, col: number) => void; // Function to handle box selection
}

export default function Box({
  boxClass,
  key,
  row,
  col,
  boxId,
  selectBox,
}: BoxProps) {
  const fn = () => {
    selectBox(row, col);
  };
  return <div className={boxClass} id={boxId} onClick={fn} />;
}
