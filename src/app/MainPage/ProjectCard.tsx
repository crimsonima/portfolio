import styled from "styled-components";

interface ProjIF {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ProjectCard({
  icon,
  title,
  description,
  link,
}: ProjIF) {
  return (
    <StyledDiv>
      <img src={icon} alt={`${title} icon`} width={200} height={200} />
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        View Project
      </a>
    </StyledDiv>
  );
}
