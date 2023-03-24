import React from 'react';
import Chat from './Chat';
import styled from 'styled-components';

const App = () => {
  return (
    <AppStyle>
      <div>
        <h1>Test purpose - nestjs and react</h1>
        <Chat />
      </div>
    </AppStyle>
  );
};

export default App;

const AppStyle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10%;
`