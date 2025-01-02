"use client";

import { useEffect, useRef, useState } from "react";
import Grid from "./grid";
import GliderGun from "./GosperGliderGun";

export function arrayClone(array: boolean[][]) {
  return JSON.parse(JSON.stringify(array));
}

export default function GameOfLife() {
  const [speed, setSpeed] = useState(100);
  const [speedin, setSpeedin] = useState(speed);
  const [rows, setRows] = useState(60);
  const [cols, setcols] = useState(60);
  const [generation, setGeneration] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false); // State to track play/pause
  const gridRef = useRef<boolean[][]>([]); // Ref to store the latest grid state

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );

  // Update the gridRef whenever grid changes
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const selectBox = (row: number, col: number) => {
    const gridCopy = arrayClone(grid);
    gridCopy[row][col] = !gridCopy[row][col];
    setGrid(gridCopy);
  };

  const seed = () => {
    // Call `clearGrid` to reset the state
    clearGrid();

    // Then seed the grid using the cleared state
    setGrid((prevGrid) => {
      const gridCopy = arrayClone(prevGrid);
      const updatedGrid = gridCopy.map((row) =>
        row.map((val) => (Math.floor(Math.random() * 4) === 1 ? true : val))
      );
      return updatedGrid;
    });
  };
  const clearGrid = () => {
    console.log("clearGridinitiated");
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
    console.log("play initiated");
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
        console.log("interval stopped");
      }
    } else {
      console.log("interval activated");
      intervalId.current = setInterval(play, speed);
    }
  }, [isRunning]);

  const gliderGun = () => {
    const g = Array.from({ length: rows }, () => Array(cols).fill(false));
    GliderGun.forEach((cell) => {
      const [y, x] = cell.split(",").map(Number); // Parse the coordinates
      g[x][y] = true; // Set the cell to true
    });
    setGrid(g);
  };

  return (
    <div>
      <h1>GameOfLife</h1>
      <Grid
        fullGrid={grid}
        speed={speed}
        rows={rows}
        cols={cols}
        selectBox={selectBox}
      />
      <button onClick={play}>next frame</button>
      <button onClick={seed}>seed</button>
      <button onClick={clearGrid}>clear</button>
      <button onClick={gliderGun}>GLIDER GUN</button>
      <button onClick={playToggle}>{isRunning ? "pause" : "play"}</button>
      <input
        type="number"
        onChange={(e) => setSpeedin(Number(e.target.value))}
        onBlur={(e) => {
          setSpeed(Number(e.target.value));
        }}
      ></input>
      {/* generation : {generation}
      <button onClick={() => setGeneration(generation + 1)}>gen+</button>
      <button onClick={() => setGeneration(generation - 1)}>gen-</button> */}
    </div>
  );
}
