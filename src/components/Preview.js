import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  id: 'preview',
  className: 'cyan darken-4'
})`
  width: 40vw;
  height: 30vh;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const PreviewFile = styled.video`

`;

// TODO Convert video before passing 
class Preview extends React.Component {
  constructor() {
    super();

    this.state = {
      previewVideo: {}
    }
  }

  render() {
    const { selectedFile } = this.props;
    return (
      <Wrapper>
        <PreviewFile width='70%' height='100%' controls={true}><source src={this.state.previewVideo} type='video/mp4' /></PreviewFile>
      </Wrapper>
    );
  }
};

export default Preview;