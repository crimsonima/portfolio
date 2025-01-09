"use client";

import styled from "styled-components";
import Education from "./Edu";
import Projects from "./Projects";
import { LiaToolsSolid } from "react-icons/lia";
import PixelFigure from "./animation/PixelFigure";
import { useEffect, useState } from "react";
import Dialogue from "./animation/Dialouge";

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
  const [talkControl, setTalkControl] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState("Hey! Sup?");

  useEffect(() => {
    setTalkControl(true);

    const duration = currentDialogue.length * 100;

    const timer = setTimeout(() => {
      setTalkControl(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentDialogue]);

  const dialogueHandler = () => {
    setCurrentDialogue("...");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDialogue("It's a mess right now but he's working on it!");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container>
        <Header>
          Still Under Development <LiaToolsSolid />
        </Header>
        <Main>
          <SpriteContainer>
            <PixelFigure talkControl={talkControl} />
            <DialogueWrapper onClick={dialogueHandler}>
              <Dialogue text={currentDialogue} />
            </DialogueWrapper>
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
