import React from 'react';
import { Navbar } from './Navbar';
import { GlobalStyle } from './theme/GlobalStyle';
import st from 'styled-components';
import { Redirect, Route, Switch } from 'react-router';
import { WorldData } from './WorldData';
import { IndiaData } from './IndiaData';
import config from './config';

const AppContainer = st.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;
`;

const AppWrapper = st.div`
  padding: 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 599px) {
    padding: 0 0.5rem;
  }
`;

export const App = () => {

  console.log(`${config.appName} || ${config.version} || ${config.envr}`);

  return (
    <>
    <GlobalStyle />
    <Navbar />
    <AppContainer>
      <AppWrapper>
        <Switch>
          <Route exact path='/' render={() => <WorldData />} />
          <Route exact path='/india' render={() => <IndiaData />} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </AppWrapper>
    </AppContainer>
    </>
  );
}