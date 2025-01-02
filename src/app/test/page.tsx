"use client";

import React, { useState, useRef, useEffect } from "react";

const PlayPauseWithTimeout = () => {
  const [isRunning, setIsRunning] = useState(false); // State to track play/pause
  const [generation, setGeneration] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const [timestamp, setTimestamp] = useState(""); // State to display updates
  // Function to be executed every 500ms
  const myFunction = () => {
    console.log(generation);
    setGeneration((prevgeneration) => prevgeneration + 1);
    const now = new Date().toLocaleTimeString();
    setTimestamp(`Function executed at: ${now}`);
  };

  // Play or Pause the function
  const togglePlayPause = () => {
    setIsRunning(!isRunning); // Toggle the play/pause state
  };

  useEffect(() => {
    if (!isRunning) {
      if (intervalId.current) {
        console.log("interval stopped");
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    } else {
      // Play: Start the function
      intervalId.current = setInterval(myFunction, 500);
      console.log("interval set");
    }
  }, [isRunning]);

  return (
    <div>
      <h2>Play/Pause with setTimeout</h2>
      <p style={{ color: "white" }}>{timestamp}</p>
      <button onClick={togglePlayPause}>{isRunning ? "Pause" : "Play"}</button>
    </div>
  );
};

export default PlayPauseWithTimeout;
