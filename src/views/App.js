import React from 'react';
// import styled from 'styled-components';
import Main from './Main';
import GlobalStyle from 'assets/styles/GlobalStyle';
import CategoriesProvider from 'providers/CategoriesProvider';
import CurrenciesProvider from 'providers/CurrenciesProvider';

const App = () => {
  return (
    <CurrenciesProvider>
      <CategoriesProvider>
        <GlobalStyle />
        <Main />
      </CategoriesProvider>
    </CurrenciesProvider>
  );
};

export default App;
