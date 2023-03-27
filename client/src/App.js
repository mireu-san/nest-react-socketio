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
            <p style={{ 
              textAlign: 'center', 
              borderBottom: '2px solid black', 
              marginBottom: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '1.2em',
              padding: '0.5em 0',
              marginTop: '0'
            }}>
              Hikarigram
            </p>

            <Chat />
            <p style={{ textAlign: 'center' }}>This is to demonstrate how nest.js and react.js can (e.g. listen and off) interact each other.</p>
          <p style={{ textAlign: 'center' }}>&copy;Chesed Kim 2023.</p>
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
  width: 65vw;
  /* height: 53vh; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;