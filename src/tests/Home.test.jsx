import React from 'react';
import renderWithRouter from '../renderWithRouter/renderWithRouter.jsx';
import { screen } from '@testing-library/react';
import Home from '../pages/Home.jsx';
import '@testing-library/jest-dom/extend-expect';

describe('Tests that embrace all home page components and elements', () => {
  it('should render App component', () => {
    renderWithRouter(<Home />);
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });
})

