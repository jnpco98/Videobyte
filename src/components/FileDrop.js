import React from 'react';
import _Dropzone from 'react-dropzone';

import styled from 'styled-components';

const Wrapper = styled.div`
  background-color:bisque;
  grid-column: 1/6;
  grid-row: 8/11;
  margin: 2rem;

  .dropzone-active {
    color:green;
  }
  .dropzone-reject {
    color:red;
  }
`;

const Dropzone = styled(_Dropzone)`
  width: 100%;
  height: 100%;
  display: flex;
  text-align:center;
  align-items:center;
  justify-content: center;
  border: 2px dashed gray;
  border-radius: 5px;
`;

const FileDrop = () => {
  const handleOnDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      console.log('accepted: ', file.name + '\n' + file.path + '\n' + file.preview + '\n' + file.size + '\n' + file.type)
    });
    rejectedFiles.forEach(file => {
      console.log('rejected: ', file.name + '\n' + file.path + '\n' + file.preview + '\n' + file.size + '\n' + file.type)
    });
  }

  return (
    <Wrapper>
      <Dropzone
        onDrop={handleOnDrop}
        multiple={true}
        accept={'video/*'}
        activeClassName="dropzone-active"
        rejectClassName="dropzone-reject" >
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Dropzone>
    </Wrapper>
  );
}

export default FileDrop;