import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.ul`
  background-color: red;
  grid-column: 1/6;
  grid-row: 1/8;
`;

const FileInfo = styled.li`
  display:flex;
  justify-content: space-between;
  align-items:center;
`;

const FileList = ({ files, removeFiles }) => {
  return (
    <Wrapper>
      {
        files.map(file => {
          const { meta, name, path, preview } = file;
          return (
            <FileInfo key={path} onClick={() => removeFiles([file])}> {name}</FileInfo>
          );
        })
      }
    </Wrapper>
  );
};

export default FileList;