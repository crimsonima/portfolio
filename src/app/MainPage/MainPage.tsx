"use client";

import styled from "styled-components";
import Education from "./Edu";
import Projects from "./Projects";
import { LiaToolsSolid } from "react-icons/lia";
import PixelFigure from "./animation/PixelFigure";
import { useEffect, useRef, useState } from "react";
import Dialogue from "./animation/Dialouge";
import dialogues from "./Dialogues";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Footer = styled.footer`
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const AboutMe = styled.section`
  background: #fff;
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DialogueWrapper = styled.div`
  position: absolute; /* Position relative to the SpriteContainer */
  top: -30px; /* Adjust to place above the figure */
  left: 200px; /* Adjust to position on the right side of the figure */
  display: flex;
  justify-content: center; /* Optional: Align dialogue text horizontally */
`;

const SpriteContainer = styled.div`
  display: flex;
  position: relative; /* Enables absolute positioning for children */
  align-items: center; /* Vertically align items */
  justify-content: flex-start; /* Align items to the left */
  background-color: #cbcbcb;
  gap: 1rem; /* Add spacing between elements */
`;

export default function MainPage() {
  const RandomDialogue = (textArr: string[][]) => {
    const random = Math.floor(Math.random() * textArr.length);
    console.log(textArr[random]);
    return textArr[random];
  };

  const [talkControl, setTalkControl] = useState(false);
  const timeoutRef = useRef<number | null>(null); // To track timeout IDs
  const secondTimeoutRef = useRef<number | null>(null);
  const [currentText, setCurrentText] = useState(() =>
    RandomDialogue(dialogues.intro.texts)
  );
  const [currentDialogue, setCurrentDialogue] = useState(dialogues.intro);

  const talkC = (dArr: string[], i: number) => {
    setTalkControl(true);
    if (i < dArr.length) {
      timeoutRef.current = window.setTimeout(() => {
        i++;
        setTalkControl(false);
        secondTimeoutRef.current = window.setTimeout(() => {
          talkC(dArr, i);
        }, 1000);
      }, dArr[i].length * 100);
    } else {
      setTalkControl(false);
    }
  };

  useEffect(() => {
    talkC(currentText, 0);
    return () => {
      // Cleanup all active timeouts on unmount or dependency change
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (secondTimeoutRef.current) {
        clearTimeout(secondTimeoutRef.current);
      }
    };
  }, [currentText]);

  const dialogueHandler = () => {
    setCurrentText(["..."]);
  };

  const handleOptionSelect = (option: keyof typeof dialogues) => {
    setCurrentDialogue(dialogues[option]);
    setCurrentText(() => RandomDialogue(dialogues[option].texts));
  };

  return (
    <>
      <Container>
        <Header>
          Still Under Development <LiaToolsSolid />
        </Header>
        <Main>
          {/* <DummyComponent /> */}
          <SpriteContainer>
            <PixelFigure talkControl={talkControl} />
            <DialogueWrapper onClick={dialogueHandler}>
              <Dialogue text={currentText} />
            </DialogueWrapper>
            <ButtonBox>
              {currentDialogue.options.map((option, index) => (
                <StyledButton
                  key={index}
                  onClick={() => handleOptionSelect(option.nextState)}
                >
                  {option.label}
                </StyledButton>
              ))}
            </ButtonBox>
          </SpriteContainer>
          <AboutMe>
            <h2>About Me</h2>
            <p>
              Hi, I&apos;m Nima! I&apos;m passionate about web development, AI,
              and creating interactive user experiences. I love building
              projects that solve real-world problems.
            </p>
          </AboutMe>
          <Education />
          <Projects />
        </Main>
        <Footer>© 2025 Nima</Footer>
      </Container>
    </>
  );
}

const StyledButton = styled.button`
  font-family: inherit;
  font-weight: 100;
  font-size: 0.9rem;
  color: #303030;
  box-shadow: 2px -2px 0px #000;
  background-color: grey;
  &:hover {
    background-color: #303030;
    color: grey;
  }
`;

const ButtonBox = styled.div`
  position: absolute; /* Position relative to the SpriteContainer */
  top: 90px; /* Adjust to place above the figure */
  left: 220px; /* Adjust to position on the right side of the figure */
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Optional: Align dialogue text horizontally */
`;
