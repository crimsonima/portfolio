import { useEffect, useState } from "react";
import styled from "styled-components";

const DialogueBox = styled.div`
  position: relative;
  background: #fff; /* White background */
  border: 2px solid #000; /* Black border for retro style */
  border-radius: 4px; /* Slightly rounded corners */
  padding: 1rem; /* Add padding for text */
  width: 250px; /* Adjust width as needed */
  color: #000; /* Black text color */
  font-family: "VT323", monospace; /* Retro font for the dialogue */
  font-size: 1.2rem; /* Adjust font size for readability */
  text-align: left;

  /* Add a shadow for a retro feel */
  box-shadow: -4px 4px 0px #000;
`;

const Tail = styled.div`
  position: absolute;
  bottom: -10px; /* Position it below the box */
  left: 0px; /* Adjust this to position the tail correctly */
  width: 0;
  height: 0;
  border-left: 10px solid transparent; /* Transparent left edge */
  border-right: 50px solid transparent; /* Transparent right edge */
  border-top: 10px solid #000; /* Black triangle pointing upwards */
`;

interface Diainter {
  text: string; // Full text to display
}

export default function Dialogue({ text }: Diainter) {
  const [displayedText, setDisplayedText] = useState(""); // For the typing effect

  useEffect(() => {
    let index = 0;
    let currentText = ""; // Local variable to track displayed text

    const timer = setInterval(() => {
      if (index < text.length) {
        currentText += text[index]; // Append the next character
        setDisplayedText(currentText); // Update state with the new value
        index++;
      } else {
        clearInterval(timer); // Stop when all characters are displayed
      }
    }, 100); // Adjust typing speed here (100ms per character)

    return () => clearInterval(timer); // Clean up interval on unmount
  }, [text]);

  return (
    <DialogueBox>
      {displayedText}
      <Tail />
    </DialogueBox>
  );
}
