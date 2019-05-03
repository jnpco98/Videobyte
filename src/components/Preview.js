import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'preview',
  className: 'transparent'
})`
  min-width: 40vw;
  min-height: 30vh;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const EmptyPreview = styled.div``;

const FileInfo = styled.div`
  width: 30%;
  height: 60%;
  font-size: 0.8rem;
  background-color: rgba(69, 71, 73, 0.5);
`;

const PreviewFile = styled.video.attrs({
  width: '60%'
})`
`;

// TODO Convert video before passing 
class Preview extends React.Component {
  constructor() {
    super();

    this.state = {
      previewVideo: {}
    }
  }

  render() {
    const { selectedFile } = this.props;
    let meta = selectedFile.meta;

    if (meta) {
      if(meta.format){
        const { bit_rate, duration, format_long_name, probe_score, size, tags } = meta.format;
        return (
          <Wrapper>
            <FileInfo>
              <p>Bit Rate: {bit_rate}</p>
              <p>Duration: {duration}</p>
              <p>Format: {format_long_name}</p>
              <p>Probe Score: {probe_score}</p>
              <p>Size: {size}</p>
              <p>Creation: {tags.creation_time}</p>
            </FileInfo>
            <PreviewFile controls={true}>
              <source src={this.state.previewVideo} type='video/mp4' />
            </PreviewFile>
          </Wrapper>
        );
      }
    }
    else {
      return (
        <Wrapper>
          <EmptyPreview>
            Preview
          </EmptyPreview>
        </Wrapper>
      );
    }
  }
};

export default Preview;