"use client";

import styled from "styled-components";
import Education from "./MainPage/Edu";
import Projects from "./MainPage/Projects";
import { LiaToolsSolid } from "react-icons/lia";

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

import GlobalStyles from "./GlobalStyles";

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          Still Under Development <LiaToolsSolid />
        </Header>
        <Main>
          {" "}
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
