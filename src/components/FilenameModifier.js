import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  className: 'blue-grey darken-4'
})`
  min-width: 50vh;
  min-height: 4rem;
  grid-column: 1/6;
  grid-row: 8/9;
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

const FilenameModifier = () => {
  return (
    <Wrapper>
      <Label>Prefix:</Label> <Input id='inputPrefix' />
      <Label>Suffix:</Label> <Input id='inputSuffix' />
    </Wrapper>
  );
};

export default FilenameModifier;