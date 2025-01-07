import styled from "styled-components";
import ProjectCard from "./ProjectCard";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function Projects() {
  return (
    <StyledDiv>
      <ProjectCard
        title="Mashhad quail"
        icon="https://mashhad-quail.vercel.app/quail_ridge%201.gif"
        link="https://mashhad-quail.vercel.app/"
        description="first project"
      />

      <ProjectCard
        title="Game Of Life"
        icon={
          "https://miro.medium.com/v2/resize:fit:1400/1*4LJkTu4lmL_kZkfuJD2kWg.gif"
        }
        link="./gof"
        description="second project"
      />
      <ProjectCard
        title="Cartpole DeepQ RL"
        icon={
          "https://raw.githubusercontent.com/crimsonima/RL-AI/refs/heads/main/pong_agent_play.gif"
        }
        link="https://github.com/crimsonima/RL-AI"
        description="third project"
      />
    </StyledDiv>
  );
}
