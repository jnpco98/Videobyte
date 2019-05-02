import { createGlobalStyle } from 'styled-components';
import segoe from './assets/fonts/segmdl2.ttf';

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
    background: rgba(29, 36, 44, 1);
  }

  @font-face {
    font-family: segoe;
    src: url(${segoe});
  }

  .transparent{
    background-color: transparent !important;
  }
  
  #file-list{
    grid-column: 1/6;
    grid-row: 1/6;
  }

  #name-modifier{
    grid-column: 1/6;
    grid-row: 6/7;
  } 

  #file-drop{
    grid-column: 1/6;
    grid-row: 7/11;
  }

  #preview{
    grid-column: 6/11;
    grid-row: 1/4;
  }

  #file-format{
    grid-column: 6/11;
    grid-row: 4/9;
  }

  #execution{
    grid-column: 6/11;
    grid-row: 9/11;
  }
`;

export default GlobalStyle;