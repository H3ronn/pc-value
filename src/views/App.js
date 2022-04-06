import React from 'react';
// import styled from 'styled-components';
import Main from './Main';
import GlobalStyle from 'assets/styles/GlobalStyle';
import CategoriesProvider from 'providers/CategoriesProvider';

const App = () => {
  return (
    <CategoriesProvider>
      <GlobalStyle />
      <Main />
    </CategoriesProvider>
  );
};

export default App;
