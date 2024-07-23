// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Weather App title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather App/i);
  expect(linkElement).toBeInTheDocument();
});

test('shows error message when city not found', async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Enter city name');
  const buttonElement = screen.getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'UnknownCity' } });
  fireEvent.click(buttonElement);

  const errorMessage = await screen.findByText('City not found');
  expect(errorMessage).toBeInTheDocument();
});
