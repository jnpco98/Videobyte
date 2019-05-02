import React from 'react';
import styled from 'styled-components';

const { remote, ipcRenderer } = window.require('electron');

const Wrapper = styled.header`
  -webkit-app-region: drag;
  width: 100vw;
  height: 2.4rem;
  display:flex;
  background-color:grey;
`;

const MenuButtons = styled.div`
  background-color: white;
  border: 0.5px red solid;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const AppName = styled.div`
  background-color: white;
  border: 0.5px red solid;
  display: flex;
  justify-content:center;
  align-items: center;
  flex-grow: 1;
`;

const MenuButton = styled.a`
  -webkit-app-region: no-drag;
  background-color: green;
  margin-left: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
`;

const WindowsControls = styled.a`
  background-color: white;
  border: 0.5px red solid;
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const WindowsControl = styled.div`
  -webkit-app-region: no-drag;
  display:flex;
  align-items: center;
  text-align:center;
  justify-content:center;
  margin-left: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  opacity: 0.8;
  font-size: 0.7rem;
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

    componentWillMount() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.on('maximize', () => this.setState({ maximized: true }));
        currentWindow.on('unmaximize', () => this.setState({ maximized: false }));
        currentWindow.on('focus', () => this.setState({ focused: true }));
    }

    menuClick = (event) => {
        ipcRenderer.send('displayAppMenu', { x: event.x, y: event.y });
    }

    minimize = () => {
        remote.getCurrentWindow().minimize();
    }

    maximize = () => {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
    }

    quit = () => {
        remote.app.quit();
    }

    render() {
        const { } = this.state;
        return (
            <Wrapper>
                <MenuButtons>
                    <MenuButton onClick={(event) => this.menuClick(event)} />
                </MenuButtons>
                <AppName>FFVideo</AppName>
                <WindowsControls>
                    <WindowsControl onClick={() => this.minimize()}>&#xE921;</WindowsControl>
                    {
                        this.state.maximized ?
                            <WindowsControl onClick={() => this.maximize()}>&#xE923;</WindowsControl> :
                            <WindowsControl onClick={() => this.maximize()}>&#xE922;</WindowsControl>
                    }
                    <WindowsControl onClick={() => this.quit()}>&#xE8BB;</WindowsControl>
                </WindowsControls>
            </Wrapper>
        );
    }
};

export default TitleBar;