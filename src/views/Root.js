import AppProviders from 'providers/AppProviders';
import React from 'react';
// import styled from 'styled-components';
import App from './App';

const Root = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
};

export default Root;
