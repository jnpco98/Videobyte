import React from 'react';
import styled from 'styled-components';
import Icon from '../assets/images/icon2.png';

const { remote, ipcRenderer } = window.require('electron');

const Wrapper = styled.header.attrs({
  className: 'transparent'
})`
  -webkit-app-region: drag;
  width: 100vw;
  height: 2.2rem;
  display:flex;
`;

const MenuButtons = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const AppName = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  flex-grow: 2;
  font-size: 0.9rem;,
`;

const MenuButton = styled.a`
  -webkit-app-region: no-drag;
  margin-left: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
`;

const WindowsControls = styled.a`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;

  .win-focused{
    color:white;
  }

  .close:hover{
    background-color: #E81123;
  }
`;

const WindowsControl = styled.div`
  -webkit-app-region: no-drag;
  display:flex;
  align-items: center;
  text-align:center;
  justify-content:center;
  margin-left: 10px;
  width: 38px;
  height: 30px;
  opacity: 0.8;
  font-size: 10px;
  font-weight: 200;
  font-family: segoe;
  color:grey;
`;

class TitleBar extends React.Component {
  constructor() {
    super();

    this.state = {
      maximized: false,
      focused: true
    }
  }

  componentDidMount() {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow) {
      currentWindow.on('maximize', () => this.setState({ maximized: true }));
      currentWindow.on('unmaximize', () => this.setState({ maximized: false }));
      currentWindow.on('focus', () => this.setState({ focused: true }));
      currentWindow.on('blur', () => this.setState({ focused: false }));
    }
  }

  menuClick = (event) => {
    ipcRenderer.send('displayAppMenu', { x: event.x, y: event.y });
  }

  minimize = () => {
    remote.getCurrentWindow().minimize();
  }

  maximize = () => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow) {
      currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
    }
  }

  quit = () => {
    remote.app.quit();
  }

  render() {
    const { maximized, focused } = this.state;
    const className = focused ? 'win-focused' : '';
    return (
      <Wrapper>
        <MenuButtons>
          <MenuButton onClick={(event) => this.menuClick(event)}><img src={Icon} width='100%' height='100%' /></MenuButton>
        </MenuButtons>
        <AppName>FFVIDEO</AppName>
        <WindowsControls>
          <WindowsControl className={className} onClick={() => this.minimize()}>&#xE921;</WindowsControl>
          {
            maximized ?
              <WindowsControl className={className} onClick={() => this.maximize()}>&#xE923;</WindowsControl> :
              <WindowsControl className={className} onClick={() => this.maximize()}>&#xE922;</WindowsControl>
          }
          <WindowsControl className={'close ' + className} onClick={() => this.quit()}>&#xE8BB;</WindowsControl>
        </WindowsControls>
      </Wrapper>
    );
  }
};

export default TitleBar;