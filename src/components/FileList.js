import React from 'react';

import SimpleBar from 'simplebar-react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'file-list',
  className: 'transparent'
})`
  min-width: 50vw;
  min-height: 30vh;
  padding: 0 0.5rem 1rem 0.5rem;

`;

const List = styled.ul.attrs({
  className: 'collection'
})`
  height: 100%;
`;

const Item = styled.li.attrs({
  className: 'collection-item'
})`
  display:flex;
  justify-content: space-between;
  align-items:center;
  &&&{
    background: rgba(29, 36, 44, 1);
  }
  &&&.active{
    background: rgba(23,58, 66, 1);
  }
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

const FileList = ({ files, removeFiles, selectedFile, setSelectedFile, openDirectory }) => {
  return (
    <Wrapper>
      <List>
        <SimpleBar style={{ height: '100%' }}>
          {
            files.map(file => {
              const { id, name, meta, progress, complete, outputPath } = file;
              return (
                <Item key={id} className={file.name === selectedFile.name ? 'active' : ''} onClick={() => setSelectedFile(file)}>
                  <RemoveFile onClick={() => removeFiles([id])}>clear</RemoveFile>
                  <FileInfo>
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