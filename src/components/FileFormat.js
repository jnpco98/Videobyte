import React from 'react';

import VideoFormat from '../VideoFormat';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color:chartreuse;
  min-width: 40vh;
  min-height: 40vh;
  grid-column: 6/11;
  grid-row: 6/9;
`;

const TypeSelect = styled.select`
`;

const FileFormat = ({ selectFormat, formatIdx }) => {
  return (
    <Wrapper>
      <TypeSelect value={formatIdx} onChange={event => selectFormat(Object.values(VideoFormat)[event.target.value])}>
        {Object.entries(VideoFormat).map((format, idx) => <option key={idx} value={idx}>{format[0]}</option>)}
      </TypeSelect>
    </Wrapper>
  );
};

export default FileFormat;