import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.ul`
  background-color: red;
  min-width: 50vh;
  min-height: 50vh;
  grid-column: 1/6;
  grid-row: 1/8;
`;

const Item = styled.li`
  display:flex;
  justify-content: space-between;
  align-items:center;
  background: green;
`;

const RemoveFile = styled.i`
  background:yellow;
`;

const FileInfo = styled.div`
`;

const Filename = styled.p``;

const FileDuration = styled.p``;

const FileList = ({ files, removeFiles, setSelectedFile }) => {
  return (
    <Wrapper>
      {
        files.map(file => {
          const { meta, name, path } = file;
          return (
            <Item key={path} onClick={() => setSelectedFile(file)}>
              <RemoveFile onClick={() => removeFiles([file])}>Remove</RemoveFile>
              <FileInfo>
                <Filename>{name}</Filename>
                <FileDuration>{meta.format.duration}</FileDuration>
              </FileInfo>
            </Item>
          );
        })
      }
    </Wrapper>
  );
};

export default FileList;