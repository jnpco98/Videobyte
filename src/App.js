import React, { Component } from 'react';

import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import TitleBar from './components/TitleBar';
import FileList from './components/FileList';
import FilenameModifier from './components/FilenameModifier';
import FileDrop from './components/FileDrop';
import FileFormat from './components/FileFormat';
import Execution from './components/Execution';
import Preview from './components/Preview';
import VideoFormat from './VideoFormat';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'simplebar/dist/simplebar.css';

const { ipcRenderer } = window.require('electron');


const Wrapper = styled.div.attrs({
  className: ''
})`
  width: 100%;
  height: 100vh;
  display:flex;
  flex-direction: column;
  background: rgba(1, 14, 26, 1);
  overflow: hidden;
`;

const InnerWrapper = styled.div.attrs({
  className: ''
})`
  display: grid;
  width: 100%;
  height: 95vh;
  padding: 1.2rem; 
  padding-top: 2.3rem;
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
      saveToCurrentDirectory: false,
    }
  }

  componentDidMount() {
    ipcRenderer.on('onFetchMetadataComplete', (event, files) => this.handleOnFetchMetadataComplete(files));
    ipcRenderer.on('onFileConvertProgress', (event, { id, percent }) => this.handleOnFileConvertProgress(id, percent));
    ipcRenderer.on('onFileConvertEnd', (event, { id, outputPath }) => this.handleOnFileConvertEnd(id, outputPath));
  }

  handleOnFetchMetadataComplete = (files) => {
    this.setState({ files: [...this.state.files, ...files] })
  }

  handleOnFileConvertProgress = (id, percent) => {
    const files = this.state.files.map(file => { return { ...file } });
    const index = files.findIndex(file => file.id === id);
    files[index].progress = percent;
    this.setState({ files: files });
  }

  handleOnFileConvertStart = (filesToConvert, size) => {
    const { selectedFormat, saveToCurrentDirectory } = this.state;
    if (filesToConvert.length > 0) {
      ipcRenderer.send('onFilesConvertStart', filesToConvert,
        {
          prefix: document.getElementById('inputPrefix').value,
          suffix: document.getElementById('inputSuffix').value,
          outputFormat: selectedFormat,
          saveLocation: document.getElementById('inputPath').value,
          saveToCurrentDirectory: saveToCurrentDirectory,
          size: size ? size : null
        });
    }
  }

  handleOnFileConvertEnd = (id, outputPath) => {
    const files = this.state.files.map(file => { return { ...file } });
    const index = files.findIndex(file => file.id === id);
    files[index].complete = true;
    files[index].outputPath = outputPath;
    this.setState({ files: files });
  }

  // Dropzone
  addFiles = (files) => {
    const ids = this.state.files.map(file => file.id);
    ipcRenderer.send('onFilesAdded', files.filter(file => !ids.includes(file.id)));
  }

  // File list
  removeFiles = (ids) => {
    this.setState({ files: this.state.files.filter(file => !ids.includes(file.id)) });
  }

  // File list
  openDirectory = (outputPath) => {
    ipcRenderer.send('onDirectoryOpened', outputPath);
  }

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
  convertFiles = (files, size) => {
    const filesToConvert = files.filter(file => file.complete === false);
    this.handleOnFileConvertStart(filesToConvert, size);
  }

  render() {
    const { files, selectedFile, selectedFormat, saveToCurrentDirectory } = this.state;
    return (
      <Wrapper>
        <GlobalStyle />
        <TitleBar />
        <InnerWrapper>
          <FileList
            files={files}
            removeFiles={this.removeFiles}
            selectedFile={selectedFile}
            setSelectedFile={this.setSelectedFile}
            openDirectory={this.openDirectory} />
          <Preview
            selectedFile={files.length > 0 ? selectedFile : {}} />
          <FilenameModifier />
          <FileFormat
            selectFormat={this.selectFormat}
            selectedFormat={selectedFormat} />
          <FileDrop
            addFiles={this.addFiles} />
          <Execution
            convert={() => this.convertFiles(files)}
            saveToCurrentDirectory={saveToCurrentDirectory}
            setSaveToCurrentDirectory={this.setSaveToCurrentDirectory} />
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default App;
