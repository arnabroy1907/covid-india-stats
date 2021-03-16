import React from 'react';
import { Navbar } from './Navbar';
import { GlobalStyle } from './theme/GlobalStyle';
import st from 'styled-components';
import { Route, Switch } from 'react-router';
import { WorldData } from './WorldData';
import { IndiaData } from './IndiaData';
import config from './config';

const AppContainer = st.div`
  background-color: #2f8da755;
  width: 100%;
  padding: 1rem;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
`;

const AppWrapper = st.div`
  padding: 0 1rem;
`;

export const App = () => {

  console.log('covid-india-stats || v1.0.4');
  console.log(`Ntfl var: ${config.netlifyVar}`);

  return (
    <>
    <GlobalStyle />
    <Navbar />
    <AppContainer>
      <AppWrapper>
        <Switch>
          <Route exact path='/' render={() => <WorldData />} />
          <Route exact path='/india' render={() => <IndiaData />} />
        </Switch>
      </AppWrapper>
    </AppContainer>
    </>
  );
}