import React from 'react';
import { Navbar } from './Navbar';
import { GlobalStyle } from './theme/GlobalStyle';

function App() {
  return (
    <>
    <GlobalStyle />
    <div>
      <Navbar />
    </div>
    </>
  );
}

export default App;
