import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rick and Morty challenge', () => {
  render(<App />);
  const linkElement = screen.getByText(/rick and morty challenge/i);
  expect(linkElement).toBeInTheDocument();
});
