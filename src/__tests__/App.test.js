import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Rick and Morty challenge', () => {
  render(<App />);
  const titleElement = screen.getByText(/rick and morty challenge/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Run button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/run/i);
  expect(buttonElement).toBeInTheDocument();
});


