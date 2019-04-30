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

const Filename = styled.p`
`;

const FileDuration = styled.p`
`;

const Progress = styled.p`
`;

const Complete = styled.div`
`;

const FileList = ({ files, removeFiles, setSelectedFile }) => {
  return (
    <Wrapper>
      {
        files.map(file => {
          const { id, name, meta, progress, complete } = file;
          return (
            <Item key={id} onClick={() => setSelectedFile(file)}>
              <RemoveFile onClick={() => removeFiles([id])}>Remove</RemoveFile>

              <FileInfo>
                <Filename>{name}</Filename>
                <FileDuration>{meta.format.duration}</FileDuration>
              </FileInfo>

              {complete ? <Complete>Complete</Complete> : <Progress>{progress + '%'}</Progress>}
            </Item>
          );
        })
      }
    </Wrapper>
  );
};

export default FileList;