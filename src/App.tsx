import React from 'react';
import styled from 'styled-components';
import { Events } from './features/events/Events';
import { DeviceWidth } from './styles/mediaQueries';

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

  @media (${DeviceWidth.mediaMaxMedium}) {
    max-width: 500px;
  }
`;
