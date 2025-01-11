import { useState, useEffect } from "react";

export default function DummyComponent() {
  const [count, setCount] = useState(0); // Counter state

  useEffect(() => {
    // Start the interval to increment the counter
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Increment the counter
      console.log("Interval tick: ", count); // Log current count
    }, 1000); // 1-second interval

    // Set a timeout to clear the interval after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval); // Stop the interval
      console.log("Timeout: Interval cleared after 10 seconds.");
    }, 10000); // 10-second timeout

    // Cleanup function to clear the interval and timeout on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      console.log("Cleanup: Component unmounted or dependencies changed.");
    };
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div>
      <h1>Count: {count}</h1>
      <p>Counter increments every second and stops after 10 seconds.</p>
    </div>
  );
}
