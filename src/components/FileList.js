import React from 'react';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'file-list',
  className: 'red'
})`
  width: 50vw;
  height: 50vh;
  padding: 1rem;
  padding-top: 0;
`;

const List = styled.ul.attrs({
  className: 'collection black-text'
})`
  height: 100%;
`;

const Item = styled.li.attrs({
  className: 'collection-item grey darken-3'
})`
  display:flex;
  justify-content: space-between;
  align-items:center;
`;

const RemoveFile = styled.i.attrs({
  className: 'material-icons small circle grey'
})`
  color:white
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
  className: 'material-icons small circle grey'
})`
  color:white
`;

const FileList = ({ files, removeFiles, setSelectedFile, openDirectory }) => {
  return (
    <Wrapper>
      <List>
        <SimpleBar style={{ height: '100%' }}>
          {
            files.map(file => {
              const { id, name, meta, progress, complete, outputPath } = file;
              return (
                <Item key={id} onClick={() => setSelectedFile(file)}>
                  <RemoveFile onClick={() => removeFiles([id])}>clear</RemoveFile>
                  <FileInfo>
                    <Filename>{name}</Filename>
                    <FileDuration>{meta.format.duration}</FileDuration>
                  </FileInfo>
                  { complete ? <Complete onClick={() => openDirectory(outputPath)}>folder</Complete> : <Progress>{progress + '%'}</Progress> }
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