import React from 'react';
import renderWithRouter from '../renderWithRouter/renderWithRouter.jsx';
import App from '../App';

it('should render App component', () => {
  renderWithRouter(<App />);
});
