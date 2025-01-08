"use client";

import styled from "styled-components";
import MainPage from "./MainPage/MainPage";

export default function Home() {
  return (
    <StyledMain>
      <MainPage />
    </StyledMain>
  );
}

const StyledMain = styled.div`
  font-family: "VT323", monospace;
  font-size: 1.5rem;
`;
