import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'preview',
  className: 'cyan darken-4'
})`
  width: 40vw;
  height: 30vh;
`;

const PreviewFile = styled.video`

`;

// TODO Convert video before passing 
const Preview = ({ selectedFile }) => {
  return (
    <Wrapper>
      {/* <PreviewFile width='480px' height='360px' controls={true}><source src={selectedFile.path} type={selectedFile.type} /></PreviewFile> */}
    </Wrapper>
  );
};

export default Preview;