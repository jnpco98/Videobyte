import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  #file-list{
    grid-column: 1/3;
    grid-row: 1/4;
  }

  #name-modifier{
    grid-column: 1/3;
    grid-row: 4/5;
  } 

  #file-drop{
    grid-column: 1/3;
    grid-row: 5/6;
  }

  #preview{
    grid-column: 4/5;
    grid-row: 1/3;
  }

  #file-format{
    grid-column: 4/5;
    grid-row: 3/5;
  }

  #execution{
    grid-column: 4/5;
    grid-row: 5/6;
  }
`;

export default GlobalStyle;