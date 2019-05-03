import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'name-modifier',
  className: 'transparent'
})`
  min-width: 50vw;
  min-height: 4rem;
  display:flex;
  align-items:center;
  padding: 0 2rem 0 2rem;
`;

const Label = styled.label`
  margin-right: 0.8rem;
  color: rgba(102,126,146,1);
`;

const Input = styled.input`
  margin-right: 0.8rem;
  width: 20%;
  color: rgba(102,126,146,1);
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