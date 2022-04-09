import AppProviders from 'providers/AppProviders';
import React from 'react';
import App from './App';

const Root = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
};

export default Root;
