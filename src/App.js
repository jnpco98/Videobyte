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
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

const { ipcRenderer } = window.require('electron');


const Wrapper = styled.div.attrs({
  className: 'blue-grey darken-4'
})`
  height: 100vh;
  display: flex;
  justify-content:center;
`;

const InnerWrapper = styled.div.attrs({
  className: 'blue-grey darken-4'
})`
  display: grid;
  width: 100%;
  padding: 1.2rem;
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
    M.AutoInit();
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
    const { selectedFormat, saveToCurrentDirectory } = this.state;
    const filesToConvert = files.filter(file => file.complete === false);
    if (filesToConvert.length > 0) {
      ipcRenderer.send('onFilesConvertStart', filesToConvert,
        {
          prefix: document.getElementById('inputPrefix').value,
          suffix: document.getElementById('inputSuffix').value,
          outputFormat: selectedFormat,
          saveLocation: document.getElementById('inputPath').value,
          saveToCurrentDirectory: saveToCurrentDirectory
        });
    }
  }

  render() {
    const { files, selectedFile, selectedFormat, saveToCurrentDirectory } = this.state;
    return (
      <Wrapper>
        <GlobalStyle />
        <InnerWrapper>
          <FileList
            files={files}
            removeFiles={this.removeFiles}
            setSelectedFile={this.setSelectedFile}
            openDirectory={this.openDirectory} />
          <FilenameModifier />
          <FileDrop
            addFiles={this.addFiles} />
          <Preview
            selectedFile={selectedFile} />
          <FileFormat
            selectFormat={this.selectFormat}
            formatIdx={Object.keys(VideoFormat).indexOf(selectedFormat.name)} />
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
