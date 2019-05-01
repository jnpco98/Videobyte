import React from 'react';

import VideoFormat from '../VideoFormat';
import styled from 'styled-components';
import M from 'materialize-css';

const Wrapper = styled.div.attrs({
  className: 'blue-grey darken-4 input-field'
})`
  min-width: 40vh;
  min-height: 40vh;
  grid-column: 6/11;
  grid-row: 6/9;
`;

const TypeSelect = styled.select.attrs({
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
    const { selectFormat, formatIdx } = this.props;
    return (
      <Wrapper>
        <TypeSelect ref={inputFormat => (this.inputFormat = inputFormat)} value={formatIdx} onChange={event => selectFormat(Object.values(VideoFormat)[event.target.value])}>
          {Object.entries(VideoFormat).map((format, idx) => <option key={idx} value={idx}>{format[0]}</option>)}
        </TypeSelect>
      </Wrapper>
    );
  }
};

export default FileFormat;