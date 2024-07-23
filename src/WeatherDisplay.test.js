// src/components/WeatherDisplay.test.js
import { render } from '@testing-library/react';
import WeatherDisplay from './WeatherDisplay';

test('renders weather display', () => {
  const weatherData = {
    name: 'Test City',
    main: {
      temp: 25,
      humidity: 50,
    },
    weather: [
      {
        description: 'clear sky',
      },
    ],
  };

  const { getByText } = render(<WeatherDisplay weather={weatherData} />);

  expect(getByText('Test City')).toBeInTheDocument();
  expect(getByText('Temperature: 25 °C')).toBeInTheDocument();
  expect(getByText('Weather: clear sky')).toBeInTheDocument();
  expect(getByText('Humidity: 50%')).toBeInTheDocument();
});
