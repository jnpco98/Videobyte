import React, { Component } from 'react';

import styled, { createGlobalStyle } from 'styled-components';

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
`;

const Wrapper = styled.div`
  margin: 5vh;
`;

const InnerWrapper = styled.div`
  height: 90vh;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(10, auto);
`;

const FileList = styled.div`
  background-color: red;
  grid-column: 1/6;
  grid-row: 1/8;
`;

const FilenameModifier = styled.div`
  background-color: blue;
  grid-column: 1/6;
  grid-row: 7/8;
`;

const FileDrop = styled.div`
  background-color:bisque;
  grid-column: 1/6;
  grid-row: 8/11;
`;

const FileGrid = styled.div`
  background-color:chartreuse;
  grid-column: 6/11;
  grid-row: 1/9;
`;

const Execution = styled.div`
  background-color:tomato;
  grid-column: 6/11;
  grid-row: 9/11;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <InnerWrapper>
          <FileList />
          <FilenameModifier />
          <FileDrop />
          <FileGrid />
          <Execution />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default App;
