import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(430deg);
  }
`;
// Styled components for the sidebar
const SidebarContainer = styled.div<{ isOpen: boolean; pos: string }>`
  position: fixed;
  top: 0;
  ${(props) =>
    props.pos === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  height: 100%;
  width: ${(props) => (props.isOpen ? "250px" : "0")};
  background-color: #111;
  overflow-x: hidden;
  transition: width 0.3s ease;
  padding-top: 20px;
  color: white;

  /* Hide content when sidebar is closed */
  div {
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: opacity 0.3s ease;
  }
`;

const SidebarItem = styled.a`
  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  display: block;
  transition: color 0.2s;

  &:hover {
    color: #f1f1f1;
  }
`;

const OpenButton = styled.button<{
  isOpen: boolean;
  spins: boolean;
  pos: string;
}>`
  position: fixed;
  top: 20px;

  ${(props) =>
    props.pos === "left"
      ? css`
          left: ${props.isOpen ? "250px" : "0px"};
        `
      : css`
          right: ${props.isOpen ? "250px" : "0px"};
        `}

  font-size: 20px;
  background-color: #111;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: ${(props) => (props.pos === "left" ? css`left` : css`right`)} 0.3s
    ease; /* Smooth movement */

  &:hover {
    background-color: #444;
  }

  svg {
    ${(props) =>
      props.spins &&
      css`
        animation: ${spin} 0.8s linear;
      `}
  }
`;

interface sideProbs {
  pos: string;
  icon: React.ComponentType;
  children: React.ReactNode;
}

export default function Sidebar({ pos, icon: Icon, children }: sideProbs) {
  const [isOpen, setIsOpen] = useState(false);
  const [spins, setSpins] = useState(false);

  const Clicked = () => {
    setSpins(true);
    console.log(spins);
    setTimeout(() => {
      setSpins(false);
    }, 800);
  };

  return (
    <>
      <OpenButton
        pos={pos}
        isOpen={isOpen}
        spins={spins}
        onClick={() => {
          setIsOpen(!isOpen);
          Clicked();
        }}
      >
        <Icon />
      </OpenButton>
      <SidebarContainer pos={pos} isOpen={isOpen}>
        <Styleddiv>{children}</Styleddiv>
      </SidebarContainer>
    </>
  );
}

const Styleddiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  margin: 10px;
`;
