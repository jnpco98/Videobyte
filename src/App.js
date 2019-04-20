import React, { Component } from 'react';

import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import FileList from './components/FileList';
import FilenameModifier from './components/FilenameModifier';
import FileDrop from './components/FileDrop';
import FileGrid from './components/FileGrid';
import Execution from './components/Execution';

const Wrapper = styled.div`
  margin: 5vh;
`;

const InnerWrapper = styled.div`
  height: 90vh;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(10, auto);
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
