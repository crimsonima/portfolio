import React from "react";
import styled from "styled-components";

interface BoxProps {
  boxClass: string; // "on" or "off" to indicate alive or dead
  row: number; // Row index
  col: number; // Column index
  boxId: string; // Unique identifier for the box
  selectBox: (row: number, col: number) => void; // Function to handle box selection
  cellSize: number;
  deadColor: string;
  liveColor: string;
}

// Styled component with dynamic styles based on the box state
const StyledBox = styled.div<{
  isAlive: boolean;
  cellsize: number;
  deadcolor: string;
  livecolor: string;
}>`
  border: 1px solid black;
  width: ${(props) => props.cellsize}px;
  height: ${(props) => props.cellsize}px;
  margin-left: -1px;
  margin-bottom: -1px;
  background-color: ${(props) =>
    props.isAlive ? props.livecolor : props.deadcolor};

  &:hover {
    background-color: ${(props) => props.livecolor};
    transform: scale(1.1);
  }
`;

const Box = ({
  boxClass,
  row,
  col,
  boxId,
  selectBox,
  cellSize,
  deadColor,
  liveColor,
}: BoxProps) => {
  // Click handler to select the box
  const handleClick = () => {
    selectBox(row, col);
  };
  return (
    <StyledBox
      isAlive={boxClass === "on"}
      id={boxId}
      onClick={handleClick}
      cellsize={cellSize}
      deadcolor={deadColor}
      livecolor={liveColor}
    />
  );
};

// Wrap the Box component in React.memo to prevent unnecessary re-renders
export default React.memo(Box, (prevProps, nextProps) => {
  // Prevent re-render if props haven't changed
  return (
    prevProps.boxClass === nextProps.boxClass &&
    prevProps.row === nextProps.row &&
    prevProps.col === nextProps.col &&
    prevProps.boxId === nextProps.boxId &&
    prevProps.cellSize === nextProps.cellSize &&
    prevProps.deadColor === nextProps.deadColor &&
    prevProps.liveColor === nextProps.liveColor
  );
});
