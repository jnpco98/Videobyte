import React from 'react';

import SimpleBar from 'simplebar-react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'file-list',
  className: 'transparent'
})`
  min-width: 50vw;
  min-height: 30vh;
  padding: 0 2rem 1rem 2rem;
`;

const List = styled.ul.attrs({
  className: 'collection'
})`
  height: 100%;
  &&&{
    border: 1px solid #1de9b6;
  }
`;

const Item = styled.li.attrs({
  className: 'collection-item'
})`
  display:flex;
  justify-content: space-between;
  align-items:center;
  &&&{
    background: rgba(1, 22, 39, 1);
  }
  &&&.active{
    background-color: rgba(0, 191, 165, 1);
    :hover{
      background-color: rgba(0, 191, 165, 1);
    }
  }
  &&&:hover{
    color:white;
    background-color: rgba(0, 191, 165, 0.8);
  }
`;

const RemoveFile = styled.i.attrs({
  className: 'material-icons small circle'
})`
  color:white;
  background-color: rgba(48, 51, 50, 0.4);
  &:hover{
    cursor: pointer;
    background-color:#d32f2f;
  }
`;

const FileInfo = styled.div`
  width: 70%;
`;

const Filename = styled.p.attrs({
  className: 'truncate'
})`
`;

const FileDuration = styled.p`
`;

const Progress = styled.p`
`;

const Complete = styled.i.attrs({
  className: 'material-icons small circle'
})`
  color:white;
  background-color: rgba(48, 51, 50, 0.4);
  &:hover{
    cursor: pointer;
    background-color:#0288d1;
  }
`;

const FileList = ({ files, removeFiles, selectedFile, setSelectedFile, openDirectory }) => {
  return (
    <Wrapper>
      <List>
        <SimpleBar style={{ height: '100%' }}>
          {
            files.map(file => {
              const { id, name, meta, progress, complete, outputPath } = file;
              return (
                <Item key={id} className={file.name === selectedFile.name ? 'active' : ''}>
                  <RemoveFile onClick={() => removeFiles([id])}>clear</RemoveFile>
                  <FileInfo onClick={() => setSelectedFile(file)}>
                    <Filename>{name}</Filename>
                    <FileDuration>{meta ? meta.format.duration : 'Duration n/a'}</FileDuration>
                  </FileInfo>
                  {complete ? <Complete onClick={() => openDirectory(outputPath)}>folder</Complete> : <Progress>{progress + '%'}</Progress>}
                </Item>
              );
            })
          }
        </SimpleBar>
      </List>
    </Wrapper>
  );
};

export default FileList;