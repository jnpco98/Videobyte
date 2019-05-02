import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'execution',
  className: 'transparent darken-4'
})`
  min-width: 40vw;
  min-height: 4rem;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 0 1rem;
`;

const SaveDirectory = styled.div`
`;

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

const Cancel = styled.a.attrs({
  className: 'transparent btn-large waves-effect white-text',
})``;

const Pause = styled.a.attrs({
  className: 'transparent btn-large waves-effect white-text'
})``;

const Icon = styled.i.attrs({
  className: 'material-icons'
})``;

const Execution = ({ convert, saveToCurrentDirectory, setSaveToCurrentDirectory }) => {
  return (
    <Wrapper>
      <SaveDirectory>
        <div>
          <PathLabel>Destination:</PathLabel>
          <PathName id='inputPath' disabled={saveToCurrentDirectory} />
        </div>
        <div>
          <SaveToDirectoryCheck id='checkSaveToCurrentDirectory' checked={saveToCurrentDirectory} onChange={() => setSaveToCurrentDirectory(!saveToCurrentDirectory)} />
          <SaveToDirectoryLabel htmlFor='checkSaveToCurrentDirectory'>Save to current directory.</SaveToDirectoryLabel>
        </div>
      </SaveDirectory>
      <Operation>
        <Cancel><Icon>pause_circle_outline</Icon></Cancel>
        <Pause onClick={() => convert()}><Icon>play_circle_outline</Icon></Pause>
      </Operation>
    </Wrapper>
  );
};

export default Execution;