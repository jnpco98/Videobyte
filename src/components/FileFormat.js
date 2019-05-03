import React from 'react';

import { VideoFormat, AudioFormat } from '../MediaFormat';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'file-format',
  className: 'transparent input-field'
})`
  min-width: 40vw;
  min-height: 40vh;
  padding: 0 2rem 2rem 1em;
`;

const List = styled.ul.attrs({
  className: 'collection'
})`
  height: 100%;
  &&&{
    border: 1px solid #1de9b6;
  }
`;

const Format = styled.li.attrs({
  className: 'collection-item'
})`
  display:flex;
  justify-content: space-between;
  align-items:center;
  &&&{
    background: rgba(1, 22, 39, 1);
  }
  &&&.active{
    background-color: rgba(0, 191, 165, 1);
    :hover{
      background-color: rgba(0, 191, 165, 1);
    }
  }
  &&&:hover{
    color:white;
    background-color: rgba(0, 191, 165, 0.8);
  }
`;

const FormatName = styled.p.attrs({
  className: ''
})`
`;

const FormatDescription = styled.p.attrs({
  className: ''
})`
`;

class FileFormat extends React.Component {
  render() {
    const { selectFormat, selectedFormat } = this.props;
    return (
      <Wrapper>
        <List>
          <SimpleBar style={{ height: '100%' }}>
            {
              Object.keys(VideoFormat).map(key => {
                const videoFormat = VideoFormat[key];
                return (
                  <Format className={videoFormat.name === selectedFormat.name ? 'active' : ''} key={key} onClick={() => selectFormat(videoFormat)}>
                    <FormatName>{videoFormat.name}</FormatName>
                    <FormatDescription>{videoFormat.extension}</FormatDescription>
                  </Format>
                );
              })
            }
            {
              Object.keys(AudioFormat).map(key => {
                const audioFormat = AudioFormat[key];
                return (
                  <Format className={audioFormat.name === selectedFormat.name ? 'active' : ''} key={key} onClick={() => selectFormat(audioFormat)}>
                    <FormatName>{audioFormat.name}</FormatName>
                    <FormatDescription>{audioFormat.extension}</FormatDescription>
                  </Format>
                );
              })
            }
          </SimpleBar>
        </List>
      </Wrapper>
    );
  }
};

export default FileFormat;