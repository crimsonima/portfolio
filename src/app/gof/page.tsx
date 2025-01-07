"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Grid from "./grid";
import GliderGun from "./GosperGliderGun";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { RiDiceLine } from "react-icons/ri";
import { MdCleaningServices } from "react-icons/md";
import { BiSolidSkipNextCircle, BiSolidMemoryCard } from "react-icons/bi";
import { arrayClone } from "./ArrayClone";

import { FaGear } from "react-icons/fa6";

export default function GameOfLife() {
  const [speed, setSpeed] = useState(100);
  const [speedin, setSpeedin] = useState(speed);
  const [rows, setRows] = useState(40);
  const [rowsin, setRowsin] = useState(rows);
  const [cols, setcols] = useState(40);
  const [colsin, setcolsin] = useState(cols);
  const [cellSize, setCellSize] = useState(17);
  const [cellSizein, setCellSizein] = useState(cellSize);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false); // State to track play/pause
  const [liveColor, setLiveColor] = useState("#3dffb1");
  const [liveColorin, setLiveColorin] = useState(liveColor);
  const [deadColor, setDeadColor] = useState("#fafffd");
  const [deadColorin, setDeadColorin] = useState(deadColor);
  const gridRef = useRef<boolean[][]>([]); // Ref to store the latest grid state

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );

  // Update the gridRef whenever grid changes
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const selectBox = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const gridCopy = arrayClone(prevGrid);
      gridCopy[row][col] = !gridCopy[row][col];
      return gridCopy;
    });
  }, []);

  const seed = () => {
    // Call `clearGrid` to reset the state
    clearGrid();

    // Then seed the grid using the cleared state
    setGrid((prevGrid) => {
      const gridCopy = arrayClone(prevGrid);
      const updatedGrid = gridCopy.map((row: boolean[]) =>
        row.map((val: boolean) =>
          Math.floor(Math.random() * 4) === 1 ? true : val
        )
      );
      return updatedGrid;
    });
  };
  const clearGrid = () => {
    setGrid(Array.from({ length: rows }, () => Array(cols).fill(false)));
  };

  const CountAlive = (grid: boolean[][], i: number, j: number) => {
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    for (let x = i - 1; x <= i + 1; x++) {
      for (let y = j - 1; y <= j + 1; y++) {
        if (x >= 0 && x < rows && y >= 0 && y < cols && !(x == i && y == j)) {
          if (grid[x][y] == true) {
            count++;
          }
        }
      }
    }
    return count;
  };
  const play = () => {
    const g = gridRef.current; // Use the latest grid state
    const g2 = arrayClone(g);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const nNeighbours = CountAlive(g, i, j);
        //  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        if (g[i][j] == true) {
          if (nNeighbours < 2) {
            g2[i][j] = false;
          }
          // Any live cell with two or three live neighbours lives on to the next generation.
          // Any live cell with more than three live neighbours dies, as if by overpopulation.
          if (nNeighbours > 3) {
            g2[i][j] = false;
          }
        }

        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if (g[i][j] == false) {
          if (nNeighbours == 3) {
            g2[i][j] = true;
          }
        }
      }
    }
    setGrid(g2);
  };

  const playToggle = () => {
    setIsRunning(!isRunning);
  };
  useEffect(() => {
    if (!isRunning) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    } else {
      intervalId.current = setInterval(play, speed);
    }
  }, [isRunning]);

  const gliderGun = () => {
    const g = Array.from({ length: rows }, () => Array(cols).fill(false));
    GliderGun.forEach((cell: string) => {
      const [y, x] = cell.split(",").map(Number); // Parse the coordinates
      g[x][y] = true; // Set the cell to true
    });
    setGrid(g);
  };

  return (
    <StyledMain>
      <h1>Game Of Life</h1>
      <BDiv>
        <StyledBotton onClick={play}>
          <BiSolidSkipNextCircle />
        </StyledBotton>
        <StyledBotton onClick={seed}>
          <RiDiceLine />
        </StyledBotton>
        <StyledBotton onClick={clearGrid}>
          <MdCleaningServices />
        </StyledBotton>
        <StyledBotton onClick={playToggle}>
          {isRunning ? <FaCirclePause /> : <FaCirclePlay />}
        </StyledBotton>
      </BDiv>
      <Sidebar pos="right" icon={BiSolidMemoryCard}>
        <Examples onClick={gliderGun}>GLIDER GUN</Examples>
      </Sidebar>
      <Sidebar pos="left" icon={FaGear}>
        <span>
          <h5>Frame Interval (ms): </h5>
          <input
            type="number"
            value={speedin}
            onChange={(e) => setSpeedin(Number(e.target.value))}
            onBlur={(e) => {
              if (isRunning) {
                playToggle();
              }

              setSpeed(Number(e.target.value));
            }}
          ></input>
        </span>
        <span>
          <h5>Cols: </h5>
          <input
            type="number"
            value={colsin}
            onChange={(e) => setcolsin(Number(e.target.value))}
            onBlur={(e) => {
              playToggle();
              const newColCount = Number(e.target.value);

              setGrid((prevGrid) => {
                const currentColCount = prevGrid[0]?.length || 0;

                return prevGrid.map((row) => {
                  if (newColCount > currentColCount) {
                    // Add new columns initialized with default values (e.g., false)
                    const additionalCols = Array(
                      newColCount - currentColCount
                    ).fill(false);
                    return [...row, ...additionalCols];
                  } else if (newColCount < currentColCount) {
                    // Remove excess columns
                    return row.slice(0, newColCount);
                  }
                  return row; // No changes
                });
              });

              setcols(newColCount); // Update the number of columns
            }}
          ></input>
        </span>
        <span>
          <h5>Rows: </h5>
          <input
            type="number"
            value={rowsin}
            onChange={(e) => setRowsin(Number(e.target.value))}
            onBlur={(e) => {
              playToggle();
              const newRowCount = Number(e.target.value);

              setGrid((prevGrid) => {
                const currentRowCount = prevGrid.length;
                const currentColCount = prevGrid[0]?.length || 0;

                if (newRowCount > currentRowCount) {
                  // Add new rows with default values (e.g., false)
                  const additionalRows = Array.from(
                    { length: newRowCount - currentRowCount },
                    () => Array(currentColCount).fill(false)
                  );
                  return [...prevGrid, ...additionalRows];
                } else if (newRowCount < currentRowCount) {
                  // Remove excess rows
                  return prevGrid.slice(0, newRowCount);
                }
                return prevGrid; // No changes
              });

              setRows(newRowCount); // Update the number of rows
            }}
          ></input>
        </span>

        <span>
          <h5>Cell size (px): </h5>
          <input
            type="number"
            value={cellSizein}
            onChange={(e) => setCellSizein(Number(e.target.value))}
            onBlur={(e) => {
              if (isRunning) {
                playToggle();
              }

              setCellSize(Number(e.target.value));
            }}
          ></input>
        </span>
        <span>
          <h5>Living Cell Color: </h5>
          <input
            type="color"
            value={liveColorin}
            onChange={(e) => setLiveColorin(e.target.value)}
            onBlur={(e) => {
              // if (isRunning) {
              //   playToggle();
              // }

              setLiveColor(e.target.value);
            }}
          />
        </span>
        <span>
          <h5>Dead Cell Color: </h5>
          <input
            type="color"
            value={deadColorin}
            onChange={(e) => setDeadColorin(e.target.value)}
            onBlur={(e) => {
              // if (isRunning) {
              //   playToggle();
              // }

              setDeadColor(e.target.value);
            }}
          ></input>
        </span>
      </Sidebar>
      <Grid
        fullGrid={grid}
        rows={rows}
        cols={cols}
        selectBox={selectBox}
        cellSize={cellSize}
        liveColor={liveColor}
        deadColor={deadColor}
      />
      {/* generation : {generation}
      <button onClick={() => setGeneration(generation + 1)}>gen+</button>
      <button onClick={() => setGeneration(generation - 1)}>gen-</button> */}
    </StyledMain>
  );
}

const Examples = styled.button`
  background-color: white;
  color: black;
  &:hover {
    color: white;
    background-color: #313131;
  }
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBotton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 24px;
  height: 40px;
  width: 40px;
  margin: 1px;
`;

const BDiv = styled.div`
  display: flex;
`;
