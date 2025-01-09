"use client";

import styled from "styled-components";

const Parent = styled.div`
  position: relative; /* Makes this the reference point for child elements */
  width: 300px;
  height: 300px;
  background: lightblue;
  display: flex;
  align-items: center; /* Vertically aligns children */
  justify-content: flex-start; /* Aligns children to the left */
`;

const Figure = styled.div`
  width: 50px;
  height: 50px;
  background: darkblue;
  border-radius: 50%;
`;

const Dialogue = styled.div`
  position: absolute; /* Allows precise placement relative to Parent */
  top: 50px; /* Distance from the top of the Parent */
  left: 60px; /* Distance from the left of the Parent */
  background: white;
  padding: 0.5rem;
  border: 1px solid black;
`;

export default function DummyPositioning() {
  return (
    <Parent>
      <Figure />
      <Dialogue>I am a dialogue box!</Dialogue>
    </Parent>
  );
}
