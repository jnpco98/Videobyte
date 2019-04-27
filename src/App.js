import React, { Component } from 'react';

import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import FileList from './components/FileList';
import FilenameModifier from './components/FilenameModifier';
import FileDrop from './components/FileDrop';
import FileGrid from './components/FileGrid';
import Execution from './components/Execution';

const { ipcRenderer } = window.require('electron');

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
  state = {
    files: []
  }

  add = (files) => {
    ipcRenderer.send('onFilesAdded', files);
  }

  remove = (files) => {
    ipcRenderer.send('onFilesRemoved', files);
  }

  convert = (files) => {

  }

  preview = (file) => {

  }

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <InnerWrapper>
          <FileList files={this.state.files} />
          <FilenameModifier />
          <FileDrop add={this.add} />
          <FileGrid files={this.state.files} />
          <Execution convert={this.convert} />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default App;
