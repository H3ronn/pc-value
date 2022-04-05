import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;

  }

  body {
    /* font-family: 'Montserrat', sans-serif; */
    font-family: Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  a, button {
    font-family: 'Montserrat', sans-serif;
    &:focus {
      outline: 1px solid black;
    }
  }

`;

export default GlobalStyle;
