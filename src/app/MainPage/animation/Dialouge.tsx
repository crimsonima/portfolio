import { useEffect, useRef, useState } from "react";
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
  text: string[]; // Full text to display
}

export default function Dialogue({ text }: Diainter) {
  const [displayedText, setDisplayedText] = useState(""); // For the typing effect
  const intervalRef = useRef<number | null>(null); // Store interval ID
  const timeoutRef = useRef<number | null>(null); // Store timeout ID

  const diaCallback = (text: string[], wordIndex: number) => {
    let textIndex = 0;
    let currentText = "";
    if (wordIndex < text.length) {
      intervalRef.current = window.setInterval(() => {
        if (textIndex < text[wordIndex].length) {
          currentText += text[wordIndex][textIndex]; // Append the next character
          setDisplayedText(currentText); // Update state with the new value
          textIndex++;
        } else {
          clearInterval(intervalRef.current!);
          timeoutRef.current = window.setTimeout(() => {
            diaCallback(text, wordIndex + 1);
          }, 1000);
        }
      }, 100);
    }
  };

  useEffect(() => {
    diaCallback(text, 0);
    return () => {
      // Cleanup on unmount or when text changes
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text]);

  return (
    <DialogueBox>
      {displayedText}
      <Tail />
    </DialogueBox>
  );
}
