import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import CommerceProvider from '../context/CommerceProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}><CommerceProvider>{component}</CommerceProvider></Router>), history,
  });
};
export default renderWithRouter;

// const customRender = (ui, {providerProps, ...renderOptions}) => {
//   return render(
//     <CommerceContext.Provider {...providerProps}>{ui}</CommerceContext.Provider>,
//     renderOptions,
//   )
// }