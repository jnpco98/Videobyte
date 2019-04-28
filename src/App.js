import React, { Component } from 'react';

import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import FileList from './components/FileList';
import FilenameModifier from './components/FilenameModifier';
import FileDrop from './components/FileDrop';
import FileFormat from './components/FileFormat';
import Execution from './components/Execution';
import Preview from './components/Preview';

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
  constructor() {
    super();

    this.state = {
      files: [],
      filenameModifier: {},
      selectedFilePreview: {},
      selectedFormat: '',
      saveLocation: ''
    }
  }

  componentDidMount() {
    ipcRenderer.on('onFetchMetaDataComplete', (event, files) => this.setState({ files: [...this.state.files, ...files] }));
  }

  // Dropzone
  addFiles = (files) => {
    const paths = this.state.files.map(file => file.path);
    const filtered = files.filter(file => !paths.includes(file.path));

    ipcRenderer.send('onFilesAdded', filtered);
  }

  // File list
  removeFiles = (files) => {
    const toRemove = files.map(file => file.path);
    this.setState({ files: this.state.files.filter(file => !toRemove.includes(file.path)) });
  }

  // File name modifier
  setFileNameModifier = (modifier) => {
    this.setState({ modifier: modifier });
  }

  // Preview
  setPreview = (file) => {

  }

  // File format
  selectFormat = (format) => {
    this.setState({ selectedFormat: format });
  }

  // Execution
  setSaveLocation = (saveLocation) => {
    this.setState({ saveLocation: saveLocation });
  }

  // Execution
  convertFiles = (files) => {

  }

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <InnerWrapper>
          <FileList files={this.state.files} removeFiles={this.removeFiles} setPreview={this.setPreview} />
          <FilenameModifier setFileNameModifier={this.setFileNameModifier} />
          <FileDrop addFiles={this.addFiles} />
          <Preview selectedFilePreview={this.state.selectedFilePreview} />
          <FileFormat selectFormat={this.selectFormat} />
          <Execution setSaveLocatione={this.setSaveLocation} convert={this.convertFiles} />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default App;
