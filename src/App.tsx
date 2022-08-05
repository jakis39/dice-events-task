import React from 'react';
import styled from 'styled-components';
import './App.css';
import { Events } from './features/events/Events';

function App() {
  return (
    <AppContainer>
      <Events />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  max-width: 1024px;
  margin: auto;
  background: white;
`;
