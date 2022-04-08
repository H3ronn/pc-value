import React from 'react';
import GlobalStyle from 'assets/styles/GlobalStyle';
import CategoriesProvider from 'providers/CategoriesProvider';
import CurrenciesProvider from 'providers/CurrenciesProvider';
import TableDataProvider from 'providers/TableDataProvider';

const AppProviders = ({ children }) => {
  return (
    <TableDataProvider>
      <CurrenciesProvider>
        <CategoriesProvider>
          <GlobalStyle />
          {children}
        </CategoriesProvider>
      </CurrenciesProvider>
    </TableDataProvider>
  );
};

export default AppProviders;
