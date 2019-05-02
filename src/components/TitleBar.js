import React from 'react';
import styled from 'styled-components';

const electron = window.require('electron');

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

const WindowsControl = styled.div`
  background-color: white;
  border: 0.5px red solid;
  display: flex;
  justify-content: flex-end;
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
  -webkit-app-region: no-drag;
  background-color: green;
  margin-left: 10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
`;


const TitleBar = () => {
    const minimize = () => {
        electron.remote.getCurrentWindow().minimize();
    }

    const maximize = () => {
        const currentWindow = electron.remote.getCurrentWindow();
        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
    }

    const quit = () => {
        electron.remote.app.quit();
    }

    return (
        <Wrapper>
            <MenuButtons>
                <MenuButton />
            </MenuButtons>
            <AppName>FFVideo</AppName>
            <WindowsControl>
                <WindowsControls onClick={() => minimize()} />
                <WindowsControls onClick={() => maximize()} />
                <WindowsControls onClick={() => quit()} />
            </WindowsControl>
        </Wrapper>
    );
};

export default TitleBar;