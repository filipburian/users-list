import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../components/Loader';
import translations from '../translations/en_GB';

const { loadingMessage } = translations;

test('renders Loader', () => {
  render(<Loader />);
  const loader = screen.getByText(loadingMessage);
  expect(loader).toBeInTheDocument();
});
