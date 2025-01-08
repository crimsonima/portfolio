import styled from "styled-components";

const Section = styled.section`
  background: #fff;
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Education = () => (
  <Section>
    <h2>Education</h2>
    <ul>
      <li>
        <strong>BSc in Computer Engineering</strong> - Khayyam University
        (2019–2023)
      </li>
      <li>
        <strong>MSc in Computer Science</strong> - University of Eastern Finland
        (2024–present)
      </li>
    </ul>
  </Section>
);

export default Education;
