import React from 'react';

import VideoFormat from '../VideoFormat';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
import M from 'materialize-css';

const Wrapper = styled.div.attrs({
  id: 'file-format',
  className: 'yellow darken-4 input-field'
})`
  min-width: 40vw;
  min-height: 40vh;
  padding: 0 0.5rem 1rem 0.5rem;
`;

const TypeSelect = styled.select.attrs({
  className: ''
})`
`;

const List = styled.ul.attrs({
  className: 'collection black-text'
})`
  height: 100%;
`;

const Format = styled.li.attrs({
  className: 'collection-item grey darken-3'
})`
  display:flex;
  justify-content: space-between;
  align-items:center;
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
  componentDidMount() {
    if (this.inputFormat) {
      M.FormSelect.getInstance(this.inputFormat);
    }
  }

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
          </SimpleBar>
        </List>
      </Wrapper>
    );
  }
};

export default FileFormat;