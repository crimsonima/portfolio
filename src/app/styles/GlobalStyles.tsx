import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    background-color: grey;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyles;
