import React from 'react';
import renderWithContextRouter from '../renderWithContextRouter/renderWithContextRouter.jsx';
import { screen } from '@testing-library/react';
import Home from '../pages/Home.jsx';
import '@testing-library/jest-dom/extend-expect';

describe('Tests that embrace all home page components and elements', () => {
  it('should render App component', () => {
    renderWithContextRouter(<Home />);
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });

  it('should get selected category at the top of the page', () => {
    renderWithContextRouter(<Home />);
    const selectedCategory = screen.getByText(/all/i);
    expect(selectedCategory).toBeInTheDocument();
  });

  it('should get back button', () => {
    renderWithContextRouter(<Home />);
    const backBtn = screen.getByTestId('back-btn');
    expect(backBtn).toBeInTheDocument();
  });

  it('should get currency select', () => {
    renderWithContextRouter(<Home />);
    const currencySelect = screen.getByRole('combobox');
    expect(currencySelect).toBeInTheDocument();
  });

  it('should get shoppingCart button', () => {
    renderWithContextRouter(<Home />);
    const cartBtn = screen.getByTestId('cart-overlay-btn');
    expect(cartBtn).toBeInTheDocument();
  });

  it('should get all cards at the screen', () => {
    renderWithContextRouter(<Home />);
    const cards = screen.getByTestId('product-card');
    expect(cards.length).not.toBe(0);
  });
})

