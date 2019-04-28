import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  background-color:tomato;
  grid-column: 6/11;
  grid-row: 9/11;
  display:flex;
  align-items:center;
  padding: 0 1rem;
`;

const Label = styled.label`
  margin-right: 0.8rem;
`;

const OutputFolder = styled.input`
  margin-right: 0.8rem;
  width: 50%;
`;

const Convert = styled.a`
`;

const Execution = ({ setSaveLocation, convert }) => {
  return (
    <Wrapper>
      <Label> Folder: </Label>
      <OutputFolder />
      <Convert onClick={() => convert()}>Convert</Convert>
    </Wrapper>
  );
};

export default Execution;