
// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import {reduxStore} from './redux/store/store'; // Import your Redux store

const render = (ui, { store = reduxStore, ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render method
export { render };