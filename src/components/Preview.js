import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color:darkgray;
  min-width: 40vh;
  min-height: 30vh;
  grid-column: 6/11;
  grid-row: 1/6;
`;

const PreviewFile = styled.video`

`;

// Convert video before passing 
const Preview = ({ selectedFile }) => {
  return (
    <Wrapper>
      {/* <PreviewFile width='480px' height='360px' controls={true}><source src={selectedFile.path} type={selectedFile.type} /></PreviewFile> */}
    </Wrapper>
  );
};

export default Preview;