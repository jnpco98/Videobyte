import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'name-modifier',
  className: 'green darken-4'
})`
  width: 50vw;
  height: 4rem;
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