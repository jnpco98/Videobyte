import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 50vh;
  min-height: 50vh;
  grid-column: 1/6;
  grid-row: 1/8;
`;

const List = styled.ul`
  background-color: thistle;
  height: 100%;
  overflow-y: scroll !important;
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

const FileList = ({ files, removeFiles, setSelectedFile, openDirectory }) => {
  return (
    <Wrapper>
      <List>
        {
          files.map(file => {
            const { id, name, meta, progress, complete } = file;
            return (
              <Item key={id} onClick={() => setSelectedFile(file)}>
                <RemoveFile onClick={() => removeFiles([id])}>clear</RemoveFile>

                <FileInfo>
                  <Filename>{name}</Filename>
                  <FileDuration>{meta.format.duration}</FileDuration>
                </FileInfo>

                {complete ? <Complete onClick={() => openDirectory(file.path)}>Complete</Complete> : <Progress>{progress + '%'}</Progress>}
              </Item>
            );
          })
        }
      </List>
    </Wrapper>
  );
};

export default FileList;