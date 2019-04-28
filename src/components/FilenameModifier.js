import React from 'react';

import VideoFormat from '../VideoFormat';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: coral;
  grid-column: 1/6;
  grid-row: 7/8;
  display:flex;
  align-items:center;
  padding: 0 1rem;
`;

const Label = styled.label`
  margin-right: 0.8rem;
`;

const Input = styled.input`
  margin-right: 0.8rem;
  width: 20%;
`;

const TypeSelect = styled.select`
`;

const FilenameModifier = () => {
  return (
    <Wrapper>
      {/* // TODO Input to be validated on submit */}
      <Label>Prefix:</Label> <Input />
      <Label>Suffix:</Label> <Input />

      <TypeSelect>
        {Object.keys(VideoFormat).map((format, idx) => <option key={idx}>{format}</option>)}
      </TypeSelect>

    </Wrapper>
  );
};

export default FilenameModifier;