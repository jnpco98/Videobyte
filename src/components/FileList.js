import React from 'react';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  className: 'blue-grey darken-4'
})`
  min-width: 50vh;
  min-height: 50vh;
  grid-column: 1/6;
  grid-row: 1/8;
  padding: 1rem;
`;

const List = styled.ul.attrs({
  className: 'collection black-text with-header'
})`
  height: 90%;
`;

const Item = styled.li.attrs({
  className: 'collection-item teal accent-4'
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
              const { id, name, meta, progress, complete } = file;
              return (
                <Item key={id} onClick={() => setSelectedFile(file)}>
                  <RemoveFile onClick={() => removeFiles([id])}>clear</RemoveFile>

                  <FileInfo>
                    <Filename>{name}</Filename>
                    <FileDuration>{meta.format.duration}</FileDuration>
                  </FileInfo>

                  {complete ? <Complete onClick={() => openDirectory(file.path)}>folder</Complete> : <Progress>{progress + '%'}</Progress>}
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