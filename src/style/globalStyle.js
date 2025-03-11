import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding: 0;
    margin: 0;
  }

  /* a {
    color: #000;
    text-decoration: none;
  } */

  input[type="text"],
  input[type="password"] {
    outline: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;