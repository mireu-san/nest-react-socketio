import React from 'react';
import Chat from './Chat';
import styled from 'styled-components';
import SidebarWhole from './Sidebar';

const App = () => {
  return (
    <Background>
      <AppStyle>
        <Content>
          <div>
            {/* <h1>Test purpose - nestjs and react</h1> */}
            <p style={{ textAlign: 'center' }}>Hikarigram</p>
            <Chat />
          </div>
        </Content>
      </AppStyle>
    </Background>
  );
};

export default App;

const AppStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Background = styled.section`
  background-color: #eff1f3;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 10px;
  /* padding: 0px; */
  width: 65vw;
  height: 53vh;
  /* padding-top: 20px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;