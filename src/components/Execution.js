import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'execution',
  className: 'transparent'
})`
  min-width: 40vw;
  min-height: 4rem;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 0 1rem 1rem 1rem;
`;

const SaveDirectory = styled.div`
  display:flex;
  align-items: center;
  width: 60%;
`;

const SaveToDirectoryCheck = styled.input.attrs({ type: 'checkbox' })`
`;

const SaveToDirectoryLabel = styled.label`
  color: rgba(102,126,146,1);
`;

const PathLabel = styled.label`
  margin-right: 0.8rem;
  color: rgba(102,126,146,1);
`;

const PathName = styled.input.attrs({
})`
  margin-right: 0.8rem;
  width: 50%;
  color: rgba(102,126,146,1);
`;

const Operation = styled.div`
  display:flex;
  padding: 0 1rem;
`;

const Start = styled.a.attrs({
  className: 'transparent btn-large waves-effect',
})`
  border: 2px solid #1de9b6 !important;
  border-radius: 5px !important;
`;

const Pause = styled.a.attrs({
  className: 'transparent btn-large waves-effect'
})`
  border: 2px solid #1de9b6 !important;
  margin-right: 0.5rem !important;
  border-radius: 5px !important;
`;

const Icon = styled.i.attrs({
  className: 'material-icons'
})`
  color: #1de9b6;
`;

const Execution = ({ convert, saveToCurrentDirectory, setSaveToCurrentDirectory }) => {
  return (
    <Wrapper>
      <SaveDirectory>
        <div className='input-field' style={{ width: '70%', marginRight: '1rem' }}>
          <PathLabel htmlFor='inputPath'><Icon>folder</Icon></PathLabel>
          <PathName id='inputPath' type='text' className='validate' disabled={saveToCurrentDirectory} />
        </div>
        <div>
          <SaveToDirectoryCheck id='checkSaveToCurrentDirectory' checked={saveToCurrentDirectory} onChange={() => setSaveToCurrentDirectory(!saveToCurrentDirectory)} />
          <SaveToDirectoryLabel htmlFor='checkSaveToCurrentDirectory' style={{ color: saveToCurrentDirectory ? '#1de9b6' : '' }} >Save to current directory...</SaveToDirectoryLabel>
        </div>
      </SaveDirectory>
      <Operation>
        <Pause><Icon>pause_circle_outline</Icon></Pause>
        <Start onClick={() => convert()}><Icon>play_circle_outline</Icon></Start>
      </Operation>
    </Wrapper>
  );
};

export default Execution;