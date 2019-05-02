import React from 'react';
import _Dropzone from 'react-dropzone';

import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'file-drop',
  className: 'transparent'
})`
  min-width: 50vw;
  min-height: 10vh;
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
    addFiles(acceptedFiles.map(file =>
      ({ id: file.path, name: file.name, path: file.path, meta: {}, type: file.type, progress: 0, complete: false, outputPath: '' })
    ));
  }

  // TODO Accept other video formats
  // TODO Return a different component for each.
  return (
    <Wrapper>
      <Dropzone onDrop={handleOnDrop} multiple={true} accept={'video/*'}>
        {
          ({ isDragActive, isDragAccept, isDragReject }) =>
            <div>
              <p>Drag 'n' drop some files here, or click to select files.</p>
            </div>
        }
      </Dropzone>
    </Wrapper>
  );
}

export default FileDrop;