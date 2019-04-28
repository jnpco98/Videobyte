import React from 'react';
import _Dropzone from 'react-dropzone';

import styled from 'styled-components';

const Wrapper = styled.div`
  background-color:bisque;
  grid-column: 1/6;
  grid-row: 8/11;
  margin: 2rem;
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

const FileDrop = ({ addFiles }) => {
  const handleOnDrop = (acceptedFiles) => {
    acceptedFiles = acceptedFiles.map(file => {
      return ({ name: file.name, path: file.path, preview: file.preview });
    });
    addFiles(acceptedFiles);
  }

  return (
    <Wrapper>
      <Dropzone
        onDrop={handleOnDrop}
        multiple={true}
        accept={'video/*'}>
        {
          ({ isDragActive, isDragAccept, isDragReject }) => {
            return (
              <div>
                {/* // TODO: Return a different component for each. */}
                <p>Drag 'n' drop some files here, or click to select files.</p>
              </div>
            );
          }
        }
      </Dropzone>
    </Wrapper>
  );
}

export default FileDrop;