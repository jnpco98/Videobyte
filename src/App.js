import React, { Component } from 'react';

import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import FileList from './components/FileList';
import FilenameModifier from './components/FilenameModifier';
import FileDrop from './components/FileDrop';
import FileFormat from './components/FileFormat';
import Execution from './components/Execution';
import Preview from './components/Preview';
import VideoFormat from './VideoFormat';

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

const INITIAL_FORMAT = 'MP4';

class App extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      selectedFile: {},
      selectedFormat: VideoFormat[INITIAL_FORMAT],
      saveToCurrentDirectory: true,
    }
  }

  componentDidMount() {
    ipcRenderer.on('onFetchMetaDataComplete', (event, files) => this.setState({ files: [...this.state.files, ...files] }));

    ipcRenderer.on('onFileConvertProgress', (event, { percent, index }) => {
      const files = this.state.files.map(file => { return { ...file } });
      const fileDuration = files[index].meta.duration;
      files[index].progress = percent;
      this.setState({ files: files });
    });

    ipcRenderer.on('onFileConvertEnd', (event, { outputPath, index }) => {
      const files = this.state.files.map(file => { return { ...file } });
      files[index].progress = '100';
      this.setState({ files: files });
    });
  }

  // Dropzone
  addFiles = (files) => {
    const idArr = this.state.files.map(file => file.id);
    ipcRenderer.send('onFilesAdded', files.filter(file => !idArr.includes(file.id)));
  }

  // File list
  removeFiles = (idArr) => {
    this.setState({ files: this.state.files.filter(file => !idArr.includes(file.id)) });
  }

  // Preview
  setSelectedFile = (selectedFile) => {
    this.setState({ selectedFile: selectedFile });
  }

  // File format
  selectFormat = (format) => {
    this.setState({ selectedFormat: format });
  }

  // Execution
  setSaveToCurrentDirectory = (enabled) => {
    this.setState({ saveToCurrentDirectory: enabled });
  }

  // Execution
  convertFiles = (files) => {
    if (files.length > 0)
      ipcRenderer.send('onFilesConvertStart', files,
        { saveLocation: document.getElementById('inputPath').value, saveToCurrentDirectory: this.state.saveToCurrentDirectory },
        { outputFormat: this.state.selectedFormat },
        { prefix: document.getElementById('inputPrefix').value, suffix: document.getElementById('inputSuffix').value });
  }

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <InnerWrapper>
          <FileList files={this.state.files} removeFiles={this.removeFiles} setSelectedFile={this.setSelectedFile} />
          <FilenameModifier />
          <FileDrop addFiles={this.addFiles} />
          <Preview selectedFile={this.state.selectedFile} /> {/**convert video before passing */}
          <FileFormat selectFormat={this.selectFormat} formatIdx={Object.keys(VideoFormat).indexOf(this.state.selectedFormat.name)} />
          <Execution convert={() => this.convertFiles(this.state.files)} saveToCurrentDirectory={this.state.saveToCurrentDirectory} setSaveToCurrentDirectory={this.setSaveToCurrentDirectory} />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default App;
