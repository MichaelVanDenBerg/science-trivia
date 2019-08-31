import React from 'react';
import styledSanitize from 'styled-sanitize';
import styled, { createGlobalStyle } from "styled-components";
//import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <SiteWrapper className="App">
      <GlobalStyle />
      <h1>Test</h1>
    </SiteWrapper>
  );
}

// Global CSS Styles.
const GlobalStyle = createGlobalStyle`
  ${styledSanitize}

  body {
    background: rgb(2,0,36);
    background: linear-gradient(to right, #0f0c29, #24243e, #302b63, #24243e, #0f0c29);
    font-family: 'Open Sans', sans-serif;
  }
`;

// Main site container.
const SiteWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

export default App;