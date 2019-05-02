import React from 'react';

import VideoFormat from '../VideoFormat';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';
import styled from 'styled-components';
import M from 'materialize-css';

const Wrapper = styled.div.attrs({
  id: 'file-format',
  className: 'yellow darken-4 input-field'
})`
  width: 40vw;
  height: 40vh;
  padding: 1rem;
  padding-top: 0;
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
                  <Format className={videoFormat.name === selectedFormat.name ? 'active' : ''} onClick={() => selectFormat(videoFormat)}>
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