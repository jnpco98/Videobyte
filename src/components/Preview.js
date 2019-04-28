import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color:darkgray;
  grid-column: 6/11;
  grid-row: 1/6;
`;

const Preview = ({ selectedFilePreview }) => {
  return (
    <Wrapper>
      {selectedFilePreview.name}
      {selectedFilePreview.preview}
    </Wrapper>
  );
};

export default Preview;