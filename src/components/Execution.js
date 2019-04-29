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

const SaveDirectory = styled.div``;

const SaveToDirectoryCheck = styled.input.attrs({ type: 'checkbox' })`
`;

const SaveToDirectoryLabel = styled.label`
`;

const PathLabel = styled.label`
  margin-right: 0.8rem;
`;

const PathName = styled.input`
  margin-right: 0.8rem;
  width: 50%;
`;

const Operation = styled.div`
  display:flex;
  align-items:center;
  padding: 0 1rem;
`;

const Cancel = styled.a`
  background: green;
`;

const Convert = styled.a`
  background: green;
`;

const Execution = ({ convert, saveToCurrentDirectory, setSaveToCurrentDirectory }) => {
  return (
    <Wrapper>
      <SaveDirectory>
        <div>
          <PathLabel> Folder: </PathLabel>
          <PathName disabled={saveToCurrentDirectory} id='inputPath' />
        </div>
        <div>
          <SaveToDirectoryCheck checked={saveToCurrentDirectory} onChange={() => setSaveToCurrentDirectory(!saveToCurrentDirectory)} />
          <SaveToDirectoryLabel> Save to current directory </SaveToDirectoryLabel>
        </div>
      </SaveDirectory>

      <Operation>
        <Cancel>Cancel</Cancel>
        <Convert onClick={() => convert()}>Convert</Convert>
      </Operation>
    </Wrapper>
  );
};

export default Execution;