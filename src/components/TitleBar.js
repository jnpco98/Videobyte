import React from 'react';
import styled from 'styled-components';

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
    return (
        <Wrapper>
            <MenuButtons>
                <MenuButton />
            </MenuButtons>
            <AppName>FFVideo</AppName>
            <WindowsControl>
                <WindowsControls/>
                <WindowsControls/>
                <WindowsControls/> 
            </WindowsControl>
        </Wrapper>
    );
};

export default TitleBar;